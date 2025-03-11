import { useState } from 'react'

import { Card, Spinner, Typography } from '@/shared/ui'
import RoundedCheckbox from '@/shared/ui/checkbox/rounded-checkbox'

import { useGetPaymentCostSubscriptionsQuery } from '../../api/subscriptions.api'
import { SubscriptionType } from '../../types'

enum Costs {
  PERDAY = 'per Day',
  PERMONTH = 'per month',
  PERWEEK = 'per 7 Days',
}

type Props = {
  title: 'Change your subscription:' | 'Your subscription costs:'
}
export const SubscriptionCosts = ({ title }: Props) => {
  const [selectedCosts, setSelectedCosts] = useState(Costs.PERDAY)
  const { data: paymentCostSubscriptions, isLoading } = useGetPaymentCostSubscriptionsQuery()

  if (isLoading) {
    return <Spinner />
  }

  const getLabel = (type: SubscriptionType, costLabel: Costs) => {
    if (!paymentCostSubscriptions) {
      return
    }
    const subscription = paymentCostSubscriptions.data.find(sub => sub.typeDescription === type)

    return subscription ? `$${subscription.amount} ${costLabel}` : ''
  }

  return (
    <>
      <Typography className={'mt-7 mb-1.5'} variant={'bold16'}>
        {title}
      </Typography>
      <Card className={'flex flex-col gap-7 pt-4 pb-4 pl-6'}>
        <RoundedCheckbox
          checked={selectedCosts === Costs.PERDAY}
          label={getLabel(SubscriptionType.DAY, Costs.PERDAY)}
          onChange={checked => checked && setSelectedCosts(Costs.PERDAY)}
        />
        <RoundedCheckbox
          checked={selectedCosts === Costs.PERWEEK}
          label={getLabel(SubscriptionType.WEEKLY, Costs.PERWEEK)}
          onChange={checked => checked && setSelectedCosts(Costs.PERWEEK)}
        />
        <RoundedCheckbox
          checked={selectedCosts === Costs.PERMONTH}
          label={getLabel(SubscriptionType.MONTHLY, Costs.PERMONTH)}
          onChange={checked => checked && setSelectedCosts(Costs.PERMONTH)}
        />
      </Card>
    </>
  )
}
