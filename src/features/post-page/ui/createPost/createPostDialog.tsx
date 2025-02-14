import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { useUploadImageForPostMutation } from '@/features/post-page/api'
import { Image } from '@/features/post-page/types'
import { PublishDialogContent } from '@/features/post-page/ui/createPost/publishDialogContent'
import { Dialog } from '@/shared/ui'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { AddFilesDialogContent } from './addFilesDialogContent'
import { CroppingDialogContent } from './croppingDialogContent'

type CreatePostDialogProps = {
  onPostPublished: () => void
} & {} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

export const CreatePostDialog = ({ onPostPublished, ...props }: CreatePostDialogProps) => {
  const [stage, setStage] = useState<'1' | '2' | '3' | '4'>('1')
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)
  const [images, setImages] = useState<Image[]>([])

  const [uploadPhoto] = useUploadImageForPostMutation()

  if (photoToUpload) {
    uploadPhoto({ file: photoToUpload })
      .unwrap()
      .then(res => {
        setImages([...images, res.images[0]])
        setStage('2')
      })
    setPhotoToUpload(null)
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileSelect = () => {
    fileInputRef?.current?.click()
  }

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setPhotoToUpload(e.currentTarget.files[0])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <input
        accept={'.jpg, .jpeg, .png'}
        className={'hidden'}
        onChange={onFileUpload}
        ref={fileInputRef}
        type={'file'}
      />
      <Dialog {...props} closePosition={stage === '1' ? 'inside' : 'none'}>
        {stage === '1' && (
          <AddFilesDialogContent handleFileSelect={handleFileSelect} handleOpenDraft={() => {}} />
        )}
        {stage === '2' && (
          <CroppingDialogContent
            handleBack={() => setStage('1')}
            handleNext={() => setStage('4')}
            images={images ?? ([] as Image[])}
          />
        )}
        {stage === '4' && (
          <PublishDialogContent
            handleBack={() => setStage('2')}
            images={images ?? ([] as Image[])}
            onPostPublished={onPostPublished}
          />
        )}
      </Dialog>
    </>
  )
}
