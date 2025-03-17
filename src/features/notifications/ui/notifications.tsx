import { BellOutline } from '@/assets/icons'
import { Badge, CustomDropdown, IconButton } from '@/shared/ui'

import { NotificationsContent } from './notifications-content'

const items = [
  {
    isReaded: false,
    text: 'Следующий платеж у вас спишется через 1 день',
    timestamp: '1 час назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: false,
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: true,
    text: 'Следующий платеж у вас спишется через 1 день',
    timestamp: '1 час назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: true,
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: true,
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: true,
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
  },
]

export type Item = {
  isReaded: boolean
  text: string
  timestamp: string
  title: string
}
const notificationCount = 3

export const Notifications = () => {
  return (
    <CustomDropdown
      menuContent={<NotificationsContent notifications={items} />}
      triggerElement={
        <IconButton>
          <Badge badgeContent={notificationCount} className={`mr-12`}>
            <BellOutline />
          </Badge>
        </IconButton>
      }
    />
  )
}
