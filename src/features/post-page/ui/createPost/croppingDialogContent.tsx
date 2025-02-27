import { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { Edit, EditOutline, Maximize, MaximizeOutline } from '@/assets/icons'
import { CreatePostHeader } from '@/features/post-page/ui/createPost/createPostHeader'
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from '@/features/post-page/ui/createPost/createPostSlice'
import { getCroppedImage } from '@/features/post-page/ui/createPost/getCroppedImage'
import { useAppDispatch, useAppSelector } from '@/services'
import { DialogBody, IconButton } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { Slider } from '@/shared/ui/slider/slider'

type CroppingDialogContentProps = {
  handleBack: () => void
  handleNext: () => void
}

export const CroppingDialogContent = ({ handleBack, handleNext }: CroppingDialogContentProps) => {
  const dispatch = useAppDispatch()
  const imagesState = useAppSelector(createPostSliceSelectors.selectImages)

  console.log(imagesState)

  const [currentImage, setCurrentImage] = useState<number>(0)

  console.log('currentImage', currentImage)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [edit, setEdit] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onSetEdit = async () => {
    if (edit && croppedAreaPixels) {
      const link = await getCroppedImage(imagesState[currentImage], croppedAreaPixels)

      dispatch(createPostSliceActions.setImage({ image: link, index: currentImage }))
    }
    setEdit(!edit)
  }

  return (
    <div className={'w-[492px] h-[564px] flex flex-col'}>
      <CreatePostHeader handleBack={handleBack} handleNext={handleNext} title={'Cropping'} />
      <DialogBody className={'h-full'}>
        <div className={'h-full relative flex-grow flex justify-center'}>
          {!edit && (
            <ImageContent itemImages={imagesState} selectedIndexCallBack={setCurrentImage} />
          )}
          {edit && (
            <Cropper
              aspect={1}
              classes={{ containerClassName: 'bg-[#606060]' }}
              crop={crop}
              image={imagesState[currentImage]}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              zoom={zoom}
            />
          )}
          <div className={'absolute bottom-3 left-3'}>
            <IconButton className={'mr-6'} color={'cropper'} onClick={onSetEdit}>
              {edit ? <Edit className={'text-accent-500'} /> : <EditOutline />}
            </IconButton>
            <IconButton color={'cropper'} onClick={() => setShowZoom(!showZoom)}>
              {showZoom ? <Maximize className={'text-accent-500'} /> : <MaximizeOutline />}
            </IconButton>
          </div>
          {showZoom && (
            <div
              className={
                'absolute left-[72px] bottom-[49px] bg-dark-500 opacity-80 h-9 w-32 flex items-center justify-center'
              }
            >
              <Slider setZoom={setZoom} zoom={zoom} />
            </div>
          )}
        </div>
      </DialogBody>
    </div>
  )
}
