import { ChangeEvent } from 'react'

export const useUploadFileHandler = (
  setErrorMessage: (error: '' | 'maxSizeError' | 'validFormatsError') => void,
  setBase64Image: (setImage: string) => void
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0]
    const validFormats = ['image/jpeg', 'image/png']

    if (image) {
      if (image.size > 10 * 1024 * 1024) {
        setErrorMessage('maxSizeError')

        return
      }

      if (!validFormats.includes(image.type)) {
        setErrorMessage('validFormatsError')

        return
      }

      const reader = new FileReader()

      reader.onloadend = () => {
        setBase64Image(reader.result as string)
        setErrorMessage('')
      }
      reader.readAsDataURL(image)
    }
  }
}
