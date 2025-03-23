import { useState } from 'react'

import { BellOutline } from '@/assets/icons'
import { Badge, CustomDropdown, IconButton } from '@/shared/ui'

import { NotificationsContent } from './notifications-content'

export const Notifications = () => {
  const [notReading, setNotReading] = useState<number | undefined>(undefined)

  return (
    <CustomDropdown
      menuContent={<NotificationsContent setNotReading={setNotReading} />}
      triggerElement={
        <IconButton>
          <Badge badgeContent={notReading} className={`mr-12`}>
            <BellOutline />
          </Badge>
        </IconButton>
      }
    />
  )
}
