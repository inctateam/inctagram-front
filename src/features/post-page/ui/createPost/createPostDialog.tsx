import { ComponentPropsWithoutRef, useRef, useState } from 'react'

import {
  createPostSliceActions,
  createPostSliceSelectors,
} from '@/features/post-page/ui/createPost/createPostSlice'
import { FilteringDialogContent } from '@/features/post-page/ui/createPost/filteringDialogContent'
import { PublishDialogContent } from '@/features/post-page/ui/createPost/publishDialogContent'
import { useAppDispatch, useAppSelector } from '@/services'
import { AlertDialog, CancelButton, ConfirmButton, Dialog } from '@/shared/ui'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { AddFilesDialogContent } from './addFilesDialogContent'
import { CroppingDialogContent } from './croppingDialogContent'

type CreatePostDialogProps = {
  onPostPublished: () => void
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

export const CreatePostDialog = ({
  onOpenChange,
  onPostPublished,
  ...props
}: CreatePostDialogProps) => {
  const images = useAppSelector(createPostSliceSelectors.selectImages)

  const [stage, setStage] = useState<'1' | '2' | '3' | '4'>('1')

  const [openAlertModal, setOpenAlertModal] = useState(false)

  const dispatch = useAppDispatch()

  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)

  if (photoToUpload) {
    const newImage = URL.createObjectURL(photoToUpload)

    dispatch(createPostSliceActions.addImage({ image: newImage }))
    setPhotoToUpload(null)
    setStage('2')
  }

  const handleOpenDraft = () => {
    setStage('2')
    dispatch(createPostSliceActions.getImagesFromDraft())
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileSelect = () => {
    fileInputRef?.current?.click()
  }

  return (
    <>
      <Dialog
        {...props}
        closePosition={stage === '1' ? 'inside' : 'none'}
        onOpenChange={open => {
          if (onOpenChange) {
            if (!open && images.length > 0) {
              setOpenAlertModal(true)
            } else {
              onOpenChange(open)
            }
          }
        }}
      >
        {stage === '1' && (
          <AddFilesDialogContent
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            handleOpenDraft={handleOpenDraft}
            setPhotoToUpload={setPhotoToUpload}
          />
        )}
        {stage === '2' && (
          <CroppingDialogContent
            fileInputRef={fileInputRef}
            handleBack={() => setStage('1')}
            handleFileSelect={handleFileSelect}
            handleNext={() => setStage('3')}
            setPhotoToUpload={setPhotoToUpload}
          />
        )}
        {stage === '3' && (
          <FilteringDialogContent
            handleBack={() => setStage('2')}
            handleNext={() => setStage('4')}
          />
        )}
        {stage === '4' && (
          <PublishDialogContent
            handleBack={() => setStage('2')}
            onPostPublished={() => {
              setStage('1')
              onPostPublished()
            }}
          />
        )}
        <AlertDialog
          cancelButton={
            <CancelButton
              onClick={() => {
                onOpenChange?.(false)
                dispatch(createPostSliceActions.moveImagesToDraft())
                setStage('1')
              }}
            >
              Save Draft
            </CancelButton>
          }
          confirmButton={
            <ConfirmButton
              onClick={() => {
                onOpenChange?.(false)
                dispatch(createPostSliceActions.setImages({ images: [] }))
                setStage('1')
              }}
            >
              Discard
            </ConfirmButton>
          }
          description={
            `Do you really want to close the creation of a publication?\n` +
            `If you close everything will be deleted`
          }
          onOpenChange={setOpenAlertModal}
          open={openAlertModal}
          title={'Close'}
        />
      </Dialog>
    </>
  )
}
