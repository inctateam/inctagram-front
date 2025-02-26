import { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { Image } from '@/features/post-page/types'
import { CreatePostHeader } from '@/features/post-page/ui/createPost/createPostHeader'
import {
  createPostSlice,
  createPostSliceActions,
  createPostSliceSelectors,
} from '@/features/post-page/ui/createPost/createPostSlice'
import { getCroppedImage } from '@/features/post-page/ui/createPost/getCroppedImage'
import { useAppDispatch, useAppSelector } from '@/services'
import { DialogBody } from '@/shared/ui'
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
  //const [link, setLink] = useState('')

  //console.log(link)

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    //console.log(croppedArea, croppedAreaPixels)
    const link = await getCroppedImage(imagesState[0], croppedAreaPixels)

    console.log('link', link)
    //setLink(link)
    dispatch(createPostSliceActions.setCroppedImages({ images: [link] }))
  }

  return (
    <div className={'w-[492px] h-[564px] flex flex-col'}>
      <CreatePostHeader handleBack={handleBack} handleNext={handleNext} title={'Cropping'} />
      <DialogBody className={'h-full'}>
        <div className={'h-full relative'}>
          {/*<ImageContent itemImages={imagesState}></ImageContent>*/}
          <Cropper
            aspect={1 / 1}
            crop={crop}
            image={imagesState[0]}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            zoom={zoom}
          />
        </div>
      </DialogBody>
    </div>
  )
}
