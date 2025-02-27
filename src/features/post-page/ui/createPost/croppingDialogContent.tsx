import React, { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { EditOutline } from '@/assets/icons'
import { CreatePostHeader } from '@/features/post-page/ui/createPost/createPostHeader'
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from '@/features/post-page/ui/createPost/createPostSlice'
import { getCroppedImage } from '@/features/post-page/ui/createPost/getCroppedImage'
import { useAppDispatch, useAppSelector } from '@/services'
import { DialogBody, IconButton } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'

type CroppingDialogContentProps = {
  handleBack: () => void
  handleNext: () => void
}

export const CroppingDialogContent = ({ handleBack, handleNext }: CroppingDialogContentProps) => {
  const dispatch = useAppDispatch()
  const imagesState = useAppSelector(createPostSliceSelectors.selectImages)

  console.log(imagesState)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [edit, setEdit] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onSetEdit = async () => {
    if (edit && croppedAreaPixels) {
      const link = await getCroppedImage(imagesState[0], croppedAreaPixels)

      dispatch(createPostSliceActions.setImages({ images: [link] }))
    }
    setEdit(!edit)
  }

  return (
    <div className={'w-[492px] h-[564px] flex flex-col'}>
      <CreatePostHeader handleBack={handleBack} handleNext={handleNext} title={'Cropping'} />
      <DialogBody className={'h-full'}>
        <div className={'h-full relative'}>
          {!edit && <ImageContent itemImages={imagesState} />}
          {edit && (
            <Cropper
              aspect={1}
              crop={crop}
              image={imagesState[0]}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              zoom={zoom}
            />
          )}
          <IconButton className={'absolute bottom-0 left-0'} onClick={onSetEdit}>
            <EditOutline />
          </IconButton>
        </div>
      </DialogBody>
    </div>
  )
}
