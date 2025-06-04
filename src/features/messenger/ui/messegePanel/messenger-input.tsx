import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { ImageOutline, MicOutline, PlayCircle, PlusCircle } from '@/assets/icons'
import { Message, MessageType } from '@/features/messenger/types'
import { Button, IconButton, TextField } from '@/shared/ui'

type MessengerInputTypeProps = {
  editMessage: Message | null
  isEditMode: boolean
  onCancelEdit?: () => void // добавлен для обработки Escape
  sendMessage?: (text: string) => void
  updateMessage: (updatedMessage: Message) => void
}
export const MessengerInput = (props: MessengerInputTypeProps) => {
  const { editMessage, isEditMode, onCancelEdit, sendMessage, updateMessage } = props
  const [messageType, setMessageType] = useState<MessageType>('TEXT')
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Эффект для установки текста и фокуса при переходе в режим редактирования
  useEffect(() => {
    if (isEditMode && editMessage) {
      setMessage(editMessage.messageText)
      inputRef.current?.focus()
    }
  }, [isEditMode, editMessage])

  // Эффект для обработки Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMessage('')
        inputRef.current?.blur()
        onCancelEdit?.()
      }
    }

    if (isEditMode) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isEditMode, onCancelEdit])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const onSendMessageHandler = () => {
    if (message.trim().length === 0) {
      return
    } else if (isEditMode && editMessage) {
      updateMessage?.({ ...editMessage, messageText: message })
    } else {
      sendMessage?.(message.trim())
    }
    setMessage('')
    onCancelEdit?.()
  }
  const onEnterMessageHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim().length > 0) {
      onSendMessageHandler()
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
