import { ChangeEvent, useState } from 'react'

import {
  CheckmarkOutline,
  DoneAllOutline,
  ImageOutline,
  MicOutline,
  PlayCircle,
  PlusCircle,
} from '@/assets/icons'
import { Message, MessageType } from '@/features/messenger/types'
import { formatMessageDate } from '@/features/messenger/utils/formatMessageDate'
import { Avatar, Button, IconButton, ScrollArea, TextField, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

const MessagePanel = ({ dialogData, myId }: { dialogData: Message[]; myId: number }) => {
  return (
    <ScrollArea className={' h-[33rem] overflow-y-hidden'}>
      <div className={'flex flex-col flex-grow gap-6 px-6 py-16 bg-dark-700'}>
        {!dialogData.length ? (
          <Typography className={'text-light-900 text-center'} variant={'regular16'}>
            There are no messages
          </Typography>
        ) : (
          dialogData.map(d => {
            return <UserMessageItem dialogItem={d} key={d.id} myId={myId} />
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
    <div className={cn('flex justify-start items-center gap-3 bg-dark-500', className)}>
      <Avatar alt={'user avatar'} size={12} src={src} />
      <Typography variant={'regular16'}>{userName}</Typography>
    </div>
  )
}

type MessageTypeProps = {
  sendMessage?: (text: string) => void
}
export const MessageInput = (props: MessageTypeProps) => {
  const { sendMessage } = props
  const [messageType, setMessageType] = useState<MessageType>('TEXT')
  const [message, setMessage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const onSendMessageHandler = () => {
    sendMessage?.(message)
    setMessage('')
  }

  return (
    <div
      className={'flex justify-between items-center h-12 px-6 py-3 gap-3 border-t border-dark-300'}
    >
      <div className={'flex'}>
        {messageType !== 'TEXT' && (
          <IconButton onClick={() => setMessageType('TEXT')}>
            <PlusCircle className={'rotate-45'} />
          </IconButton>
        )}

        {messageType === 'VOICE' && (
          <IconButton>
            <PlayCircle />
          </IconButton>
        )}
      </div>

      {messageType === 'IMAGE' && (
        <div className={'text-muted-foreground text-sm'}>Image input coming soon...</div>
      )}

      {messageType === 'TEXT' && (
        <TextField onChange={handleChange} placeholder={'Type message...'} value={message} />
      )}

      {message.trim().length > 0 ? (
        <Button onClick={onSendMessageHandler} variant={'text'}>
          {messageType === 'VOICE' ? 'Send voice' : 'Send message'}
        </Button>
      ) : (
        messageType === 'TEXT' && (
          <div className={'flex gap-3'}>
            <IconButton onClick={() => setMessageType('VOICE')}>
              <MicOutline />
            </IconButton>
            <IconButton onClick={() => setMessageType('IMAGE')}>
              <ImageOutline />
            </IconButton>
          </div>
        )
      )}
    </div>
  )
}

export const UserMessageItem = ({ dialogItem, myId }: { dialogItem: Message; myId: number }) => {
  const { createdAt, messageText, ownerId, status } = dialogItem
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
}
