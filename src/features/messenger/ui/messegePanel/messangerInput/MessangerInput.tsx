import { ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react'

import { ImageOutline, MicOutline, PlusCircle } from '@/assets/icons'
import { MessageType } from '@/features/messenger/types'
import { useVoiceMessage } from '@/features/messenger/utils/useVoiceMessage'
import { Button, IconButton, Slider, TextField } from '@/shared/ui'

type MessengerInputTypeProps = {
  sendMessage?: (text: string, isVoice: boolean, audioBuffer?: Uint8Array) => void
}

const MessengerInput = (props: MessengerInputTypeProps) => {
  const { sendMessage } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const [messageType, setMessageType] = useState<MessageType>('TEXT')
  const [message, setMessage] = useState('')
  const { audioUrl, isRecording, reset, startRecording, stopRecording } = useVoiceMessage()

  const [progress, setProgress] = useState(0)
  const [audioFile, setAudioFile] = useState<Blob | null>(null)
  const [audioDuration, setAudioDuration] = useState(0)
  const [isError, setIsError] = useState(false)
  const [remainingTime, setRemainingTime] = useState(60) // секунд осталось

  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    inputRef.current?.focus()

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const onSendMessageHandler = () => {
    if (message.trim().length > 0) {
      sendMessage?.(message, false)
      setMessage('')
    }
  }

  const onEnterMessageHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && message.trim().length > 0) {
      sendMessage?.(message.trim(), false)
      setMessage('')
    }
  }

  const onEnterVoiceHandler = async () => {
    const audioBuffer = await stopRecording()

    if (audioBuffer) {
      const uint8AudioBuffer = new Uint8Array(audioBuffer)

      if (audioFile && (audioFile.size > 3 * 1024 * 1024 || audioDuration > 60)) {
        setIsError(true)

        return
      }

      sendMessage?.('', true, uint8AudioBuffer)
      reset()
    }
  }

  const handleStartRecording = async () => {
    setProgress(1)
    setRemainingTime(60)
    await startRecording()

    const startTime = Date.now()
    const duration = 60000
    const minZoom = 1
    const maxZoom = 3

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const zoomProgress = minZoom + (elapsed / duration) * (maxZoom - minZoom)

      const timeLeft = Math.max(0, Math.ceil((duration - elapsed) / 1000))

      setRemainingTime(timeLeft)

      if (zoomProgress >= maxZoom) {
        setProgress(maxZoom)
        setRemainingTime(0)
        clearInterval(progressIntervalRef.current!)
        handleStopRecording()
      } else {
        setProgress(zoomProgress)
      }
    }, 100)
  }

  const handleStopRecording = async () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    setProgress(0)

    const buffer = await stopRecording()

    if (buffer) {
      const file = new Blob([buffer], { type: 'audio/mp3' })

      setAudioFile(file)

      const fileUrl = URL.createObjectURL(file)
      const audio = new Audio(fileUrl)

      audio.onloadedmetadata = () => {
        const duration = audio.duration

        setAudioDuration(duration)

        if (file.size > 3 * 1024 * 1024 || duration > 60) {
          setIsError(true)
        } else {
          setIsError(false)
        }

        setProgress(0)
        // ВАЖНО: сбрасываем после завершения всех операций
        reset()
      }
    }
  }

  const handleCancelPreview = () => {
    setMessageType('TEXT')
    setAudioFile(null)
    setRemainingTime(60)
    reset()
  }

  return (
    <>
      <div className={'flex justify-between'}>
        {messageType !== 'TEXT' && (
          <IconButton onClick={handleCancelPreview}>
            <PlusCircle className={'rotate-45'} />
          </IconButton>
        )}

        {messageType === 'VOICE' && (
          <div className={'flex'}>
            <IconButton onClick={isRecording ? handleStopRecording : handleStartRecording}>
              <MicOutline />
            </IconButton>
            {/* Предпрослушка перед отправкой */}
            {audioUrl ? (
              <div className={'flex'}>
                <audio className={'h-full'} controls>
                  <source src={audioUrl} type={'audio/mp3'} />
                  Your browser does not support the audio element.
                </audio>
                <div className={'flex space-x-4'}>
                  <Button disabled={isError} onClick={onEnterVoiceHandler} variant={'text'}>
                    Send Voice
                  </Button>
                  {isError && (
                    <span className={'text-red-500'}>Audio is too large or too long!</span>
                  )}
                </div>
              </div>
            ) : (
              <div className={'flex gap-3 items-center'}>
                <Slider className={'w-96'} setZoom={setProgress} zoom={progress} />
                <span className={'text-muted-foreground text-sm w-[40px] text-right'}>
                  {remainingTime}s
                </span>
              </div>
            )}
          </div>
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

      {isError && <div className={'text-red-500'}>Audio is too large or too long!</div>}

      {message.trim().length > 0 ? (
        <Button onClick={onSendMessageHandler} variant={'text'}>
          Send message
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
