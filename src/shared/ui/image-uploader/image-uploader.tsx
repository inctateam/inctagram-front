import { ChangeEvent, RefObject, useState } from 'react'

import { ImageOutline } from '@/assets/icons'
import { Typography } from '@/shared/ui'

type ImageUploaderProps = {
  fileInputRef: RefObject<HTMLInputElement>
  setPhotoToUpload: (file: File) => void
}

export const ImageUploader = ({ fileInputRef, setPhotoToUpload }: ImageUploaderProps) => {
  const [error, setError] = useState('')

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')

    const validFormats = ['image/jpeg', 'image/png']
    const maxSizeInB = 20000000

    if (e.currentTarget.files) {
      if (e.currentTarget.files[0].size < maxSizeInB) {
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
    <div className={'flex flex-col items-center'}>
      <input
        accept={'.jpg, .jpeg, .png'}
        className={'hidden'}
        onChange={onFileSelected}
        ref={fileInputRef}
        type={'file'}
      />
      {error && (
        <div
          className={
            'w-full flex justify-center bg-danger-900 border border-danger-500 py-2 px-6 my-6'
          }
        >
          <Typography variant={'bold14'}>{error}</Typography>
        </div>
      )}
      <div
        className={`w-[222px] h-[228px] flex justify-center items-center bg-dark-500 ${
          error ? '' : 'mt-[72px]'
        }`}
      >
        <ImageOutline height={36} width={36} />
      </div>
    </div>
  )
}
