import { ComponentPropsWithoutRef, useState } from 'react'

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

  const [uploadPhoto] = useUploadImageForPostMutation()

  const [images, setImages] = useState<Image[]>([])

  if (photoToUpload) {
    uploadPhoto({ file: photoToUpload })
      .unwrap()
      .then(res => {
        setImages([...images, res.images[0]])
        setStage('2')
      })
    setPhotoToUpload(null)
  }

  return (
    <>
      <Dialog {...props} closePosition={stage === '1' ? 'inside' : 'none'}>
        {stage === '1' && (
          <AddFilesDialogContent handleOpenDraft={() => {}} setPhotoToUpload={setPhotoToUpload} />
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
            onPostPublished={() => {
              setStage('1')
              onPostPublished()
            }}
          />
        )}
      </Dialog>
    </>
  )
}
