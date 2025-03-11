import { DragEvent, ReactNode, RefObject } from 'react'

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
  const onFileSelected = (files: FileList | null) => {
    setError('')

    const validFormats = ['image/jpeg', 'image/png']
    const maxSizeByte = maxSizeMb * 1024 * 1024

    if (files) {
      if (files[0].size < maxSizeByte) {
        if (validFormats.includes(files[0].type)) {
          setPhotoToUpload(files[0])
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

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files

    onFileSelected(files)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className={'relative'} onDragOver={handleDragOver} onDrop={handleDrop}>
      <input
        accept={'.jpg, .jpeg, .png'}
        className={'hidden'}
        onChange={e => onFileSelected(e.currentTarget.files)}
        ref={fileInputRef}
        type={'file'}
      />
      {children}
    </div>
  )
}
