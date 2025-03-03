import { ChangeEvent, ReactNode, RefObject } from 'react'

type ImageUploaderProps = {
  children: ReactNode
  fileInputRef: RefObject<HTMLInputElement>
  maxSizeMb?: number
  setError: (error: string) => void
  setPhotoToUpload: (file: File) => void
}

export const ImageUploader = ({
  children,
  fileInputRef,
  maxSizeMb = 20,
  setError,
  setPhotoToUpload,
}: ImageUploaderProps) => {
  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')

    const validFormats = ['image/jpeg', 'image/png']
    const maxSizeByte = maxSizeMb * 1024 * 1024

    if (e.currentTarget.files) {
      if (e.currentTarget.files[0].size < maxSizeByte) {
        if (validFormats.includes(e.currentTarget.files[0].type)) {
          setPhotoToUpload(e.currentTarget.files[0])
        } else {
          setError('The photo must have JPEG or PNG format')
        }
      } else {
        setError('The photo must be less than 20 Mb')
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        accept={'.jpg, .jpeg, .png'}
        className={'hidden'}
        onChange={onFileSelected}
        ref={fileInputRef}
        type={'file'}
      />
      {children}
    </div>
  )
}
