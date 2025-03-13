'use client'
import { useEffect, useState } from 'react'

import { PaypalLogo, StripeLogo } from '@/assets/icons'
import { PATH, baseUrl } from '@/shared/constants'
import { AlertDialog, Card, ConfirmButton, ProgressBar, Typography } from '@/shared/ui'
import RoundedCheckbox from '@/shared/ui/checkbox/rounded-checkbox'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import {
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionsQuery,
  useGetMyPaymentsQuery,
  useGetPaymentCostSubscriptionsQuery,
} from '../../api/subscriptions.api'
import { PaymentType, SubscriptionType } from '../../types'
import { SubscriptionCosts } from './subscription-costs'

enum Option {
  BUSINESS = 'Business',
  PERSONAL = 'Personal',
}

const AccountManagement = () => {
  const router = useRouter()
  const params = useParams()
  const userId: string = params.id as string
  const searchParams = useSearchParams()
  const [selectedOption, setSelectedOption] = useState(Option.PERSONAL)
  const [isOpenPayModal, setIsOpenPayModal] = useState(false)
  const [isCheckedPayModal, setIsCheckedPayModal] = useState(false)
  const [paymentType, setPaymentType] = useState('')
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<SubscriptionType>(
    SubscriptionType.DAY
  )
  const [selectedAmount, setSelectedAmount] = useState<number>(0) // Инициализация по умолчанию
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false)
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false)
  const [subscriptionCreationTime, setSubscriptionCreationTime] = useState<Date | null>(null)
  const [isSubscriptionRequested, setIsSubscriptionRequested] = useState(false)
  const { data: currentSubscriptions } = useGetCurrentSubscriptionsQuery(undefined, {
    skip: selectedOption !== Option.BUSINESS, // Пропустить запрос, если не выбран BUSINESS
  })
  const { data: paymentCostSubscriptions, isLoading: isLoadingSubscriptions } =
    useGetPaymentCostSubscriptionsQuery(undefined, {
      skip: selectedOption !== Option.BUSINESS, // Пропустить запрос, если не выбран BUSINESS
    })
  const [createSubscription, { isLoading: isLoadingPayment }] = useCreateSubscriptionMutation()
  const { refetch: refetchMyPayments } = useGetMyPaymentsQuery()

  // Установка подписки DAY по умолчанию при загрузке данных
  useEffect(() => {
    if (paymentCostSubscriptions?.data) {
      const defaultSubscription = paymentCostSubscriptions.data.find(
        sub => sub.typeDescription === SubscriptionType.DAY
      )

      if (defaultSubscription) {
        setSelectedSubscriptionType(defaultSubscription.typeDescription)
        setSelectedAmount(defaultSubscription.amount)
      }
    }
  }, [paymentCostSubscriptions])

  useEffect(() => {
    const success = searchParams.get('success')

    if (success === 'true') {
      // Проверяем, был ли запрос на подписку
      if (!isSubscriptionRequested) {
        setIsErrorAlertOpen(true) // Показываем ошибку, если запроса не было

        return
      }
      // Проверяем, был ли создан новый платеж после создания подписки
      checkForNewPayment()
      setIsSuccessAlertOpen(true)
    } else if (success === 'false') {
      setIsErrorAlertOpen(true)
    }
  }, [searchParams])
  const handlePaymentClick = (type: PaymentType) => {
    if (!selectedAmount) {
      console.error('Amount is not selected')

      return
    }
    setPaymentType(type)
    setIsOpenPayModal(true)
  }

  const checkForNewPayment = async () => {
    if (!subscriptionCreationTime) {
      return
    }

    // Запрашиваем актуальный список платежей
    const { data: updatedPayments } = await refetchMyPayments()

    if (updatedPayments) {
      // Ищем платеж, который был создан после subscriptionCreationTime
      const newPayment = updatedPayments.find(payment => {
        const paymentDate = new Date(payment.dateOfPayment)

        return paymentDate > subscriptionCreationTime
      })

      if (newPayment) {
        setIsSuccessAlertOpen(true) // Показываем успех, если платеж найден
      } else {
        setIsErrorAlertOpen(true) // Показываем ошибку, если платеж не найден
      }
    }
  }

  const handleConfirmPay = async () => {
    // Устанавливаем флаг, что запрос на подписку был отправлен
    setIsSubscriptionRequested(true)

    // Сохраняем текущее время перед созданием подписки
    setSubscriptionCreationTime(new Date())

    const response = await createSubscription({
      amount: selectedAmount,
      baseUrl: `${baseUrl + PATH.ACCOUNT.replace(':id', userId)}`,
      paymentType: paymentType as PaymentType,
      typeSubscription: selectedSubscriptionType,
    })

    if (!response.data) {
      return
    }
    if (response.data.url) {
      router.push(response.data.url)
    }
    setIsOpenPayModal(false)
  }

  if (isLoadingPayment || isLoadingSubscriptions) {
    return <ProgressBar />
  }

  return (
    <>
      <Typography className={'mt-7 mb-1.5'} variant={'bold16'}>
        Account type:
      </Typography>
      <Card className={'flex flex-col gap-7 pt-4 pb-4 pl-6 mb-11'}>
        <RoundedCheckbox
          checked={selectedOption === Option.PERSONAL}
          label={Option.PERSONAL}
          onChange={checked => checked && setSelectedOption(Option.PERSONAL)}
        />
        <RoundedCheckbox
          checked={selectedOption === Option.BUSINESS}
          label={Option.BUSINESS}
          onChange={checked => checked && setSelectedOption(Option.BUSINESS)}
        />
      </Card>
      {selectedOption === Option.BUSINESS && (
        <>
          <SubscriptionCosts
            onSelectSubscription={(type, amount) => {
              setSelectedSubscriptionType(type)
              setSelectedAmount(amount)
            }}
            paymentCostSubscriptions={paymentCostSubscriptions} // Передача данных в SubscriptionCosts
            selectedSubscriptionType={selectedSubscriptionType}
            title={
              (currentSubscriptions?.data ?? []).length > 0
                ? 'Change your subscription:'
                : 'Your subscription costs:'
            }
          />
          <div className={'flex justify-end items-center gap-10 mr-[-16px]'}>
            <button onClick={() => handlePaymentClick(PaymentType.PAYPAL)} type={'button'}>
              <PaypalLogo className={'w-[141px] h-[101px] mt-6'} />
            </button>
            <Typography className={'mb-4 select-none'}>Or</Typography>
            <button onClick={() => handlePaymentClick(PaymentType.STRIPE)} type={'button'}>
              <StripeLogo className={'w-[141px] h-[101px] mt-6'} />
            </button>
          </div>
        </>
      )}
      <AlertDialog
        checkbox={
          <RoundedCheckbox
            checked={isCheckedPayModal}
            label={'Agree'}
            onChange={() => setIsCheckedPayModal(prev => !prev)}
          />
        }
        confirmButton={
          <ConfirmButton disabled={!isCheckedPayModal} onClick={handleConfirmPay}>
            OK
          </ConfirmButton>
        }
        description={
          'Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings.'
        }
        onOpenChange={setIsOpenPayModal}
        open={isOpenPayModal}
      />
      <AlertDialog
        confirmButton={
          <ConfirmButton className={'w-[366px] ml-[-70px]'} variant={'primary'}>
            Back to payment
          </ConfirmButton>
        }
        description={'Transaction failed, please try again'}
        onOpenChange={setIsErrorAlertOpen}
        open={isErrorAlertOpen}
        title={'Error'}
      />
      <AlertDialog
        confirmButton={
          <ConfirmButton className={'w-[366px] ml-[-70px]'} variant={'primary'}>
            Ok
          </ConfirmButton>
        }
        description={'Payment was successful!'}
        onOpenChange={setIsSuccessAlertOpen}
        open={isSuccessAlertOpen}
        title={'Success'}
      />
    </>
  )
}

export { AccountManagement }
