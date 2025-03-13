import { ComponentPropsWithoutRef, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/services'
import { AlertDialog, CancelButton, ConfirmButton, Dialog } from '@/shared/ui'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'

import { createPostSliceActions, createPostSliceSelectors } from '../utils'
import {
  AddFilesDialogContent,
  CroppingDialogContent,
  FilteringDialogContent,
  PublishDialogContent,
} from './createPostDialogContent'

type CreatePostDialogProps = {
  onPostPublished: () => void
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

export enum CreatePostStages {
  AddFiles = 1,
  Cropping = 2,
  Filtering = 3,
  Publish = 4,
}

export const CreatePostDialog = ({
  onOpenChange,
  onPostPublished,
  ...props
}: CreatePostDialogProps) => {
  const t = useTranslations('CreatePost')

  const images = useAppSelector(createPostSliceSelectors.selectImages)

  const [stage, setStage] = useState<CreatePostStages>(CreatePostStages.AddFiles)

  const [openAlertModal, setOpenAlertModal] = useState(false)

  const dispatch = useAppDispatch()

  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)

  if (photoToUpload) {
    const newImage = URL.createObjectURL(photoToUpload)

    dispatch(createPostSliceActions.addImage({ image: newImage }))
    setPhotoToUpload(null)
    setStage(CreatePostStages.Cropping)
  }

  const handleOpenDraft = () => {
    setStage(CreatePostStages.Cropping)
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
        closePosition={stage === CreatePostStages.AddFiles ? 'inside' : 'none'}
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
        {stage === CreatePostStages.AddFiles && (
          <AddFilesDialogContent
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            handleOpenDraft={handleOpenDraft}
            setPhotoToUpload={setPhotoToUpload}
          />
        )}
        {stage === CreatePostStages.Cropping && (
          <CroppingDialogContent
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            setPhotoToUpload={setPhotoToUpload}
            setStage={setStage}
          />
        )}
        {stage === CreatePostStages.Filtering && <FilteringDialogContent setStage={setStage} />}
        {stage === CreatePostStages.Publish && (
          <PublishDialogContent
            onPostPublished={() => {
              setStage(CreatePostStages.AddFiles)
              onPostPublished()
            }}
            setStage={setStage}
          />
        )}
        <AlertDialog
          cancelButton={
            <CancelButton
              onClick={() => {
                onOpenChange?.(false)
                dispatch(createPostSliceActions.moveImagesToDraft())
                setStage(CreatePostStages.AddFiles)
              }}
            >
              {t('saveDraft')}
            </CancelButton>
          }
          confirmButton={
            <ConfirmButton
              onClick={() => {
                onOpenChange?.(false)
                dispatch(createPostSliceActions.setImages({ images: [] }))
                setStage(CreatePostStages.AddFiles)
              }}
            >
              {t('discard')}
            </ConfirmButton>
          }
          description={`${t('closeAlertDescription1')}\n${t('closeAlertDescription2')}`}
          onOpenChange={setOpenAlertModal}
          open={openAlertModal}
          title={t('closeAlertTitle')}
        />
      </Dialog>
    </>
  )
}
