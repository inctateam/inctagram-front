'use client'
import { useEffect, useState } from 'react'

import { PaypalLogo, StripeLogo } from '@/assets/icons'
import { CurrentSubscription } from '@/features/profile-settings-page/ui/account-management/current-subscription'
import { PATH, baseUrl } from '@/shared/constants'
import { useBoolean } from '@/shared/hooks'
import { AlertDialog, Card, ConfirmButton, ProgressBar, Typography } from '@/shared/ui'
import RoundedCheckbox from '@/shared/ui/checkbox/rounded-checkbox'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import {
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionsQuery,
  useGetPaymentCostSubscriptionsQuery,
} from '../../api/subscriptions.api'
import { PaymentType, SubscriptionType } from '../../types'
import { SubscriptionCosts } from './subscription-costs'

enum Option {
  BUSINESS = 'Business',
  PERSONAL = 'Personal',
}

type Props = {
  accountType: 'business' | 'personal'
}
const AccountManagement = ({ accountType }: Props) => {
  const router = useRouter()
  const params = useParams()
  const userId: string = params.id as string
  const searchParams = useSearchParams()

  const [selectedOption, setSelectedOption] = useState<Option>(
    accountType === 'business' ? Option.BUSINESS : Option.PERSONAL
  )

  // Синхронизация selectedOption с accountType из URL
  useEffect(() => {
    setSelectedOption(accountType === 'business' ? Option.BUSINESS : Option.PERSONAL)
  }, [accountType])

  const [isOpenPayModal, { setFalse: closePayModal, setTrue: openPayModal }] = useBoolean(false)
  const [isCheckedPayModal, { toggle: togglePayModal }] = useBoolean(false)
  const [paymentType, setPaymentType] = useState('')
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<SubscriptionType>(
    SubscriptionType.DAY
  )
  const [selectedAmount, setSelectedAmount] = useState<number>(0) // Инициализация по умолчанию
  const [isSuccessAlertOpen, { setFalse: closeSuccessAlert, setTrue: openSuccessAlert }] =
    useBoolean(false)
  const [isErrorAlertOpen, { setFalse: closeErrorAlert, setTrue: openErrorAlert }] =
    useBoolean(false)
  const { data: currentSubscriptions } = useGetCurrentSubscriptionsQuery(undefined, {
    skip: selectedOption !== Option.BUSINESS, // Пропустить запрос, если не выбран BUSINESS
  })
  const { data: paymentCostSubscriptions, isLoading: isLoadingSubscriptions } =
    useGetPaymentCostSubscriptionsQuery(undefined, {
      skip: selectedOption !== Option.BUSINESS, // Пропустить запрос, если не выбран BUSINESS
    })
  const [createSubscription, { isLoading: isLoadingPayment }] = useCreateSubscriptionMutation()

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

  // Проверяем localStorage при монтировании компонента
  useEffect(() => {
    const isPaymentRequested = localStorage.getItem('isPaymentRequested') === 'true'
    const accountType = localStorage.getItem('accountType')

    if (accountType) {
      setSelectedOption(accountType === 'business' ? Option.BUSINESS : Option.PERSONAL)
      localStorage.removeItem('accountType')
    }

    if (isPaymentRequested) {
      const success = searchParams.get('success')

      if (success === 'true') {
        openSuccessAlert()
      } else if (success === 'false') {
        openErrorAlert()
      }
      localStorage.removeItem('isPaymentRequested') // Очищаем флаг после использования
    }
    // Если accountType отсутствует в URL, устанавливаем значение по умолчанию
    if (!accountType) {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      newSearchParams.set(
        'accountType',
        selectedOption === Option.BUSINESS ? 'business' : 'personal'
      )
      router.replace(`?${newSearchParams.toString()}`)
    }
  }, [searchParams, router, selectedOption])
  const handlePaymentClick = (type: PaymentType) => {
    if (!selectedAmount) {
      console.error('Amount is not selected')

      return
    }
    setPaymentType(type)
    openPayModal()
  }

  const handleConfirmPay = async () => {
    localStorage.setItem('isPaymentRequested', 'true') // Устанавливаем флаг перед запросом
    localStorage.setItem(
      'accountType',
      selectedOption === Option.BUSINESS ? 'business' : 'personal'
    )
    const response = await createSubscription({
      amount: selectedAmount,
      baseUrl: `${baseUrl + PATH.PROFILE_SETTINGS.replace(':id', userId)}`,
      paymentType: paymentType as PaymentType,
      typeSubscription: selectedSubscriptionType,
    })

    if (!response.data) {
      return
    }
    if (response.data.url) {
      router.push(response.data.url)
    }
    closePayModal()
  }

  const accountTypeChange = () => {
    setSelectedOption(Option.PERSONAL)
  }

  if (isLoadingPayment || isLoadingSubscriptions) {
    return <ProgressBar />
  }

  return (
    <>
      <CurrentSubscription accountTypeChange={accountTypeChange} />
      <Typography className={'mt-7 mb-1.5'} variant={'bold16'}>
        Account type:
      </Typography>
      <Card className={'flex flex-col gap-7 pt-4 pb-4 pl-6 mb-11'}>
        <RoundedCheckbox
          checked={selectedOption === Option.PERSONAL}
          label={Option.PERSONAL}
          onChange={checked => {
            if (checked) {
              setSelectedOption(Option.PERSONAL)
              const newSearchParams = new URLSearchParams(searchParams.toString())

              newSearchParams.set('accountType', 'personal')
              router.replace(`?${newSearchParams.toString()}`)
            }
          }}
        />
        <RoundedCheckbox
          checked={selectedOption === Option.BUSINESS}
          label={Option.BUSINESS}
          onChange={checked => {
            if (checked) {
              setSelectedOption(Option.BUSINESS)
              const newSearchParams = new URLSearchParams(searchParams.toString())

              newSearchParams.set('accountType', 'business')
              router.replace(`?${newSearchParams.toString()}`)
            }
          }}
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
          <RoundedCheckbox checked={isCheckedPayModal} label={'Agree'} onChange={togglePayModal} />
        }
        confirmButton={
          <ConfirmButton disabled={!isCheckedPayModal} onClick={handleConfirmPay}>
            OK
          </ConfirmButton>
        }
        description={
          'Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings.'
        }
        onOpenChange={open => (open ? openPayModal() : closePayModal())}
        open={isOpenPayModal}
      />
      <AlertDialog
        confirmButton={
          <ConfirmButton className={'w-[366px] ml-[-70px]'} variant={'primary'}>
            Back to payment
          </ConfirmButton>
        }
        description={'Transaction failed, please try again'}
        onOpenChange={open => (open ? openErrorAlert() : closeErrorAlert())}
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
        onOpenChange={open => (open ? openSuccessAlert() : closeSuccessAlert())}
        open={isSuccessAlertOpen}
        title={'Success'}
      />
    </>
  )
}

export { AccountManagement }
