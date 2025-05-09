import { CheckmarkOutline, DoneAllOutline } from '@/assets/icons'
import { Message } from '@/features/messenger/types'
import { Avatar, Button, ScrollArea, Textarea, Typography } from '@/shared/ui'
import { cn, timeAgo } from '@/shared/utils'

const MessagePanel = ({ dialogData }: { dialogData: Message[] }) => {
  return (
    <ScrollArea className={'overflow-y-hidden'}>
      <div className={'flex flex-col flex-grow gap-6 px-6 py-16 bg-dark-700'}>
        {!dialogData.length ? (
          <Typography className={'text-light-900 text-center'} variant={'regular16'}>
            There are no messages
          </Typography>
        ) : (
          dialogData.map(d => {
            return <UserMessageItem dialogItem={d} key={d.id} />
          })
        )}
      </div>
    </ScrollArea>
  )
}

export default MessagePanel

type CurrentUserProps = {
  className?: string
  src?: string
  userName?: string
}
export const CurrentUser = (props: CurrentUserProps) => {
  const { className, src, userName = 'Ekaterina Ivanova' } = props

  return (
    <div className={cn('flex justify-start items-center gap-3 bg-dark-500 p-3', className)}>
      <Avatar alt={'user avatar'} size={12} src={src} />
      <Typography variant={'regular16'}>{userName}</Typography>
    </div>
  )
}

export const MessageInput = () => {
  return (
    <div className={'flex h-12'}>
      <Textarea autoResize={false} />
      <Button variant={'text'}>Send message</Button>
    </div>
  )
}

// type UserMessageItemProps = {
//   className?: string
//   isChecked?: boolean
//   message: string
//   ownerId: number
//   src?: string
//   time: string
// }

export const UserMessageItem = ({ dialogItem }: { dialogItem: Message }) => {
  const { createdAt, messageText, ownerId, status } = dialogItem
  const myId = 2050
  const isMyMessage = myId === ownerId

  return (
    <div className={cn('flex items-end gap-3', isMyMessage ? 'justify-end' : 'justify-start')}>
      {!isMyMessage && <Avatar alt={'user avatar'} size={9} src={''} />}
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
            {timeAgo(createdAt)}
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
}
