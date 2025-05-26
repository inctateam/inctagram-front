import { useRef, useState } from 'react'

import MicRecorder from 'mic-recorder-to-mp3'

export const useVoiceMessage = () => {
  const recorder = useRef(new MicRecorder({ bitRate: 128 }))
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<null | string>(null)

  // Начать запись
  const startRecording = async () => {
    try {
      await recorder.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Не удалось начать запись:', error)
    }
  }

  // Остановить запись и получить аудио
  const stopRecording = async () => {
    try {
      const [buffer, blob] = await recorder.current.stop().getMp3()

      // Создаем URL для аудиофайла
      const url = URL.createObjectURL(blob)

      setAudioUrl(url) // Сохраняем аудиофайл для использования

      setIsRecording(false)

      return buffer // Возвращаем buffer (например, для отправки на сервер)
    } catch (error) {
      console.error('Не удалось остановить запись:', error)
    }
  }

  // Сбросить все
  const reset = () => {
    setAudioUrl(null)
    setIsRecording(false)
  }

  return {
    audioUrl,
    isRecording,
    reset,
    startRecording,
    stopRecording,
  }
}
