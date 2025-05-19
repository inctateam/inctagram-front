import { ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react'

import { ImageOutline, MicOutline, PlayCircle, PlusCircle } from '@/assets/icons'
import { MessageType } from '@/features/messenger/types'
import { Button, IconButton, TextField } from '@/shared/ui'

type MessengerInputTypeProps = {
  sendMessage?: (text: string) => void
}
const MessengerInput = (props: MessengerInputTypeProps) => {
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
  )
}

export default MessengerInput
