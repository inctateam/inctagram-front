import { CheckmarkOutline, DoneAllOutline } from '@/assets/icons'
import { Avatar, Button, ScrollArea, Textarea, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

const MessagePanel = () => {
  return (
    <ScrollArea className={' overflow-y-hidden'}>
      <div className={'flex flex-col flex-grow gap-6 px-6 py-16 bg-dark-700'}>
        <UserMessageItem message={'Hi! How are you?'} ownerId={2061} time={'11:20'} />
        <UserMessageItem
          isChecked
          message={'Hi! I’m fine! Did you go into space yesterday? :D'}
          ownerId={2050}
          time={'11:23'}
        />
        <UserMessageItem
          message={"Ahahahahaha, just kidding! I'm still just learning to fly and code :D"}
          ownerId={2061}
          time={'11:30'}
        />
        <UserMessageItem
          message={"Ahahahahaha, just kidding! I'm still just learning to fly and code :D"}
          ownerId={2061}
          time={'11:30'}
        />
        <UserMessageItem
          isChecked={false}
          message={'Great! Dont give up!!!😎'}
          ownerId={2050}
          time={'11:40'}
        />
        <UserMessageItem
          isChecked={false}
          message={
            'When a long text message is segmented into multiple physical SMS messages, a special header is added to each physical SMS message so that the receiving client knows that it is a multipart SMS message that must be reassembled by the client. These headers are known as segmentation or concatenation headers. 6 bytes (8-bits each) are required for these concatenation headers in each physical SMS message. These headers are placed in the User Data Header (UDH) field of the message, but they do count against the overall size limit of the message.'
          }
          ownerId={2050}
          time={'11:40'}
        />
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
    <div className={cn('flex justify-start items-center p-3 gap-3 bg-dark-500', className)}>
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

type UserMessageItemProps = {
  className?: string
  isChecked?: boolean
  message: string
  ownerId: number
  src?: string
  time: string
}

export const UserMessageItem = (props: UserMessageItemProps) => {
  const { className, isChecked = false, message, ownerId, src, time } = props
  const myId = 2050
  const isMyMessage = myId === ownerId

  return (
    <div
      className={cn(
        'flex items-end gap-3',
        isMyMessage ? 'justify-end' : 'justify-start',
        className
      )}
    >
      {!isMyMessage && <Avatar alt={'user avatar'} size={9} src={src} />}
      <div
        className={cn(
          'flex flex-col px-3 py-2 gap-1 max-w-[275px] rounded-md',
          isMyMessage ? 'bg-accent-700' : 'bg-dark-300'
        )}
      >
        <Typography className={'text-pretty'} variant={'regular14'}>
          {message}
        </Typography>
        <div className={'flex items-center justify-end gap-1'}>
          <Typography
            className={cn('text-xs', isMyMessage ? 'text-accent-100' : 'text-light-900')}
            variant={'small'}
          >
            {time}
          </Typography>
          {isMyMessage &&
            (isChecked ? (
              <DoneAllOutline className={'w-4 h-4 text-accent-100'} />
            ) : (
              <CheckmarkOutline className={'w-4 h-4 text-accent-100'} />
            ))}
        </div>
      </div>
    </div>
  )
}
