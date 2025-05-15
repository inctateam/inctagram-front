import {
  ChangeEvent,
  KeyboardEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  CheckmarkOutline,
  DoneAllOutline,
  ImageOutline,
  MicOutline,
  PlayCircle,
  PlusCircle,
} from '@/assets/icons'
import { useGetMessagesByUserQuery } from '@/features/messenger/api/messenger-api'
import { Message, MessageType } from '@/features/messenger/types'
import { formatMessageDate } from '@/features/messenger/utils/formatMessageDate'
import { Avatar, Button, IconButton, ScrollArea, TextField, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

const MESSAGES_LIMIT = 12

const MessagePanel = ({
  cursor,
  dialoguePartnerId,
  meId,
  setCursor,
  userAvatar,
}: {
  cursor: number | undefined
  dialoguePartnerId?: number
  meId: number
  setCursor: (val: number) => void
  userAvatar: string
}) => {
  // const [cursor, setCursor] = useState<number | undefined>(undefined)
  const {
    data: dialogData,
    isFetching,
    // isLoading: dialogDataIsLoading,
  } = useGetMessagesByUserQuery(
    {
      dialoguePartnerId: dialoguePartnerId!,
      meId: meId!,
      params: { cursor, pageSize: MESSAGES_LIMIT },
    },
    { skip: dialoguePartnerId === null || meId === undefined }
  )

  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useRef<HTMLDivElement | null>(null)

  const setLastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) {
        return
      }

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            const lastItemId = dialogData?.items[0]?.id

            if (lastItemId) {
              setCursor(lastItemId)
            }
          }
        },
        { threshold: 0.5 }
      )

      if (node) {
        observer.current.observe(node)
      }
    },
    [dialogData?.items, isFetching, setCursor]
  )

  return (
    <ScrollArea className={' h-[33rem] overflow-y-hidden'} viewportRef={lastItemRef}>
      {dialoguePartnerId ? (
        <div className={'flex flex-col flex-grow gap-6 px-6 py-16 bg-dark-700'}>
          {isFetching && (
            <div className={'flex justify-center items-center'}>
              <Typography className={'text-light-900'} variant={'regular16'}>
                Loading more messages....✉
              </Typography>
            </div>
          )}
          {!dialogData?.items.length ? (
            <Typography className={'text-light-900 text-center'} variant={'regular16'}>
              There are no messages
            </Typography>
          ) : (
            dialogData?.items?.map((d, i) => {
              return (
                <UserMessageItem
                  dialogItem={d}
                  key={d.id}
                  meId={meId}
                  ref={i === 0 ? setLastItemRef : null}
                  userAvatar={userAvatar}
                />
              )
            })
          )}
        </div>
      ) : (
        <div className={'flex justify-center items-center h-[33rem] mt-5'}>
          <Typography className={'text-light-900'} variant={'regular16'}>
            Start a chat with the user from the list
          </Typography>
        </div>
      )}
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
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const onSendMessageHandler = () => {
    sendMessage?.(message)
    setMessage('')
  }
  const onEnterMessageHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && message.trim().length > 0) {
      sendMessage?.(message.trim())
      setMessage('')
    }
  }

  return (
    // <div
    //   className={'flex justify-between items-center h-12 px-6 py-3 gap-3 border-t border-dark-300'}
    // >
    <>
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
        <TextField
          onChange={handleChange}
          onKeyDown={onEnterMessageHandler}
          placeholder={'Type message...'}
          ref={inputRef}
          value={message}
        />
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
    </>
    // </div>
  )
}

export const UserMessageItem = forwardRef<
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
