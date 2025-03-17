import { BellOutline } from '@/assets/icons'
import { Badge, CustomDropdown, IconButton } from '@/shared/ui'

import { useGetNotificationsQuery } from '../api/notifications.api'
import { NotificationsContent } from './notifications-content'

const NOTIFICATIONS_LIMIT = 100

export const Notifications = () => {
  const { data: notifications } = useGetNotificationsQuery({
    pageSize: NOTIFICATIONS_LIMIT,
    sortBy: 'createdAt',
  })
  const notificationCount = notifications?.notReadCount || 0

  return (
    <CustomDropdown
      menuContent={<NotificationsContent notifications={notifications?.items || []} />}
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
