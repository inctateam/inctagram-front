'use client'
import { useState } from 'react'

import { PaypalLogo, StripeLogo } from '@/assets/icons'
import { AlertDialog, Card, ConfirmButton, ProgressBar, Typography } from '@/shared/ui'
import RoundedCheckbox from '@/shared/ui/checkbox/rounded-checkbox'

import {
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionsQuery,
} from '../../api/subscriptions.api'
import { SubscriptionCosts } from './subscription-costs'
import { PaymentType } from '../../types'
import { baseUrl } from '@/shared/constants'

enum Option {
  BUSINESS = 'Business',
  PERSONAL = 'Personal',
}

export const AccountManagement = () => {
  const [selectedOption, setSelectedOption] = useState(Option.PERSONAL)
  const [isOpenPayModal, setIsOpenPayModal] = useState(false)
  const [isCheckedPayModal, setIsCheckedPayModal] = useState(false)
  const [paymentType, setPaymentType] = useState('')
  const { data: currentSubscriptions } = useGetCurrentSubscriptionsQuery(undefined, {
    skip: selectedOption !== Option.BUSINESS, // Пропустить запрос, если не выбран BUSINESS
  })

  const [createSubscription, { isLoading: isLoadingPayment }] = useCreateSubscriptionMutation()
  const handlePaymentClick = (type: PaymentType) => {
    setPaymentType(type)
    setIsOpenPayModal(true)
  }
  const handleConfirmPay = async () => {
    const response = await createSubscription({
      amount: 
      baseUrl: baseUrl,
      paymentType: paymentType as PaymentType,
      typeSubscription: 
    })

    if (!response.data) {
      return
    }
    if (response.data.url) {
      window.location.href = response.data.url // Redirect to the payment page
    }
    setIsOpenPayModal(false)
  }

  if (isLoadingPayment) {
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
    </>
  )
}
