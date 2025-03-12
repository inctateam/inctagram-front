import { Card, Typography } from '@/shared/ui'
import RoundedCheckbox from '@/shared/ui/checkbox/rounded-checkbox'

import { PaymentCostSubscriptionsResponse, SubscriptionType } from '../../types'

enum Costs {
  PERDAY = 'per Day',
  PERMONTH = 'per month',
  PERWEEK = 'per 7 Days',
}

type Props = {
  title: 'Change your subscription:' | 'Your subscription costs:'
  onSelectSubscription: (type: SubscriptionType, amount: number) => void
  selectedSubscriptionType: SubscriptionType
  paymentCostSubscriptions?: PaymentCostSubscriptionsResponse // Данные передаются из родительского компонента
}
export const SubscriptionCosts = ({
  title,
  onSelectSubscription,
  selectedSubscriptionType,
  paymentCostSubscriptions,
}: Props) => {

  // Функция для получения текстового описания стоимости в зависимости от типа подписки
  const getCostLabel = (type: SubscriptionType) => {
    switch (type) {
      case SubscriptionType.DAY:
        return Costs.PERDAY
      case SubscriptionType.WEEKLY:
        return Costs.PERWEEK
      case SubscriptionType.MONTHLY:
        return Costs.PERMONTH
      default:
        return ''
    }
  }

  return (
    <>
      <Typography className={'mt-7 mb-1.5'} variant={'bold16'}>
        {title}
      </Typography>
      <Card className={'flex flex-col gap-7 pt-4 pb-4 pl-6'}>
        {paymentCostSubscriptions?.data.map(subscription => (
          <RoundedCheckbox
            key={subscription.typeDescription}
            checked={selectedSubscriptionType === subscription.typeDescription}
            label={`$${subscription.amount} ${getCostLabel(subscription.typeDescription)}`}
            onChange={() => onSelectSubscription(subscription.typeDescription, subscription.amount)}
          />
        ))}
      </Card>
    </>
  )
}
