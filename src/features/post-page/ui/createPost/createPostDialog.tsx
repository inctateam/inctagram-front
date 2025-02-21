import { ComponentPropsWithoutRef, useState } from 'react'

import { useUploadImageForPostMutation } from '@/features/post-page/api'
import { Image } from '@/features/post-page/types'
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from '@/features/post-page/ui/createPost/createPostSlice'
import { PublishDialogContent } from '@/features/post-page/ui/createPost/publishDialogContent'
import { useAppDispatch, useAppSelector } from '@/services'
import { Dialog } from '@/shared/ui'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { AddFilesDialogContent } from './addFilesDialogContent'
import { CroppingDialogContent } from './croppingDialogContent'

type CreatePostDialogProps = {
  onPostPublished: () => void
} & {} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

export const CreatePostDialog = ({ onPostPublished, ...props }: CreatePostDialogProps) => {
  const [stage, setStage] = useState<'1' | '2' | '3' | '4'>('1')

  const dispatch = useAppDispatch()

  const imagesState = useAppSelector(createPostSliceSelectors.selectImages)

  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)

  if (photoToUpload) {
    const newImage = URL.createObjectURL(photoToUpload)

    dispatch(createPostSliceActions.addImage({ image: newImage }))
    setPhotoToUpload(null)
    setStage('2')
  }

  // if (photoToUpload) {
  //   uploadPhoto({ file: photoToUpload })
  //     .unwrap()
  //     .then(res => {
  //       setImages([...images, res.images[0]])
  //       dispatch(createPostSliceActions.addImage({ image: res.images[0] }))
  //       setStage('2')
  //     })
  //   setPhotoToUpload(null)
  // }

  const handleOpenDraft = () => {
    setStage('2')
  }

  return (
    <>
      <Dialog {...props} closePosition={stage === '1' ? 'inside' : 'none'}>
        {stage === '1' && (
          <AddFilesDialogContent
            handleOpenDraft={handleOpenDraft}
            setPhotoToUpload={setPhotoToUpload}
          />
        )}
        {stage === '2' && (
          <CroppingDialogContent
            handleBack={() => setStage('1')}
            handleNext={() => setStage('4')}
          />
        )}
        {stage === '4' && (
          <PublishDialogContent
            handleBack={() => setStage('2')}
            images={imagesState ?? ([] as string[])}
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
