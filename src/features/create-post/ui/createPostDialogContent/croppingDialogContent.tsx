import { RefObject, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { toast } from 'react-toastify'

import {
  CloseOutline,
  Edit,
  EditOutline,
  Image,
  ImageOutline,
  Maximize,
  MaximizeOutline,
  PlusCircleOutline,
} from '@/assets/icons'
import {
  createPostSliceActions,
  createPostSliceSelectors,
  getCroppedImage,
} from '@/features/create-post/utils'
import { useAppDispatch, useAppSelector } from '@/services'
import { DialogBody, IconButton, ImageContent, ImageUploader, Slider } from '@/shared/ui'
import { useTranslations } from 'next-intl'

import { CreatePostStages } from '../createPostDialog'
import { CreatePostHeader } from './createPostHeader'

type CroppingDialogContentProps = {
  fileInputRef: RefObject<HTMLInputElement>
  handleFileSelect: () => void
  setPhotoToUpload: (file: File) => void
  setStage: (stage: CreatePostStages) => void
}

export const CroppingDialogContent = ({
  fileInputRef,
  handleFileSelect,
  setPhotoToUpload,
  setStage,
}: CroppingDialogContentProps) => {
  const t = useTranslations('CreatePost')

  const dispatch = useAppDispatch()
  const imagesState = useAppSelector(createPostSliceSelectors.selectFilteredImages)

  const [currentImage, setCurrentImage] = useState<number>(0)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [edit, setEdit] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [showImages, setShowImages] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [error, setError] = useState('')

  if (error) {
    toast.error(error)
    setError('')
  }

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
      <CreatePostHeader
        handleBack={() => setStage(CreatePostStages.AddFiles)}
        handleNext={() => setStage(CreatePostStages.Filtering)}
        title={t('cropping')}
      />
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
          <IconButton
            className={'absolute bottom-3 right-3'}
            color={'cropper'}
            onClick={() => setShowImages(!showImages)}
          >
            {showImages ? <Image className={'text-accent-500'} /> : <ImageOutline />}
          </IconButton>
          {showImages && (
            <div
              className={
                'absolute right-3 bottom-[49px] bg-dark-500 opacity-80 flex gap-3 p-3 flex-wrap'
              }
            >
              {imagesState.map((image, index) => (
                <div className={'relative'} key={index}>
                  <img
                    alt={`image ${index + 1}`}
                    className={'w-20 h-20 object-contain'}
                    src={image}
                  />
                  <IconButton
                    className={'absolute top-1 right-1'}
                    color={'cropper'}
                    onClick={() => {
                      dispatch(createPostSliceActions.deleteImage({ index }))
                    }}
                    size={'xs'}
                  >
                    <CloseOutline />
                  </IconButton>
                </div>
              ))}
              <ImageUploader
                fileInputRef={fileInputRef}
                setError={setError}
                setPhotoToUpload={setPhotoToUpload}
              >
                <IconButton size={'medium'}>
                  <PlusCircleOutline
                    onClick={() => {
                      handleFileSelect()
                    }}
                  />
                </IconButton>
              </ImageUploader>
            </div>
          )}
        </div>
      </DialogBody>
    </div>
  )
}
