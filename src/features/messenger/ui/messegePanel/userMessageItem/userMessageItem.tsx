import { forwardRef } from 'react'

import { CheckmarkOutline, DoneAllOutline } from '@/assets/icons'
import { Message } from '@/features/messenger/types'
import { formatMessageDate } from '@/features/messenger/utils/formatMessageDate'
import { Avatar, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

const UserMessageItem = forwardRef<
  HTMLDivElement,
  {
    dialogItem: Message
    meId: number
    userAvatar: string
  }
>(({ dialogItem, meId, userAvatar }, ref) => {
  const { createdAt, messageText, ownerId, status } = dialogItem
  const isMyMessage = meId === ownerId

  return (
    <div
      className={cn('flex items-end gap-3', isMyMessage ? 'justify-end' : 'justify-start')}
      ref={ref}
    >
      {!isMyMessage && <Avatar alt={'user avatar'} size={9} src={userAvatar} />}
      <div
        className={cn(
          'flex flex-col px-3 py-2 gap-1 max-w-[275px] rounded-md',
          isMyMessage ? 'bg-accent-700' : 'bg-dark-300'
        )}
      >
        <Typography className={'text-pretty'} variant={'regular14'}>
          {messageText}
        </Typography>
        <div className={'flex items-center justify-end gap-1'}>
          <Typography
            className={cn('text-xs', isMyMessage ? 'text-accent-100' : 'text-light-900')}
            variant={'small'}
          >
            {formatMessageDate(createdAt, true)}
          </Typography>
          {isMyMessage &&
            (status === 'READ' ? (
              <DoneAllOutline className={'w-4 h-4 text-accent-100'} />
            ) : (
              <CheckmarkOutline className={'w-4 h-4 text-accent-100'} />
            ))}
        </div>
      </div>
    </div>
  )
})

export default UserMessageItem
