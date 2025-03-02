'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import { CreatePostDialog } from '@/features/post-page/ui/createPost/createPostDialog'
import { Button } from '@/shared/ui'

export default function Test() {
  const [open, setOpen] = useState<boolean>(false)

  const onPostPublished = () => {
    setOpen(false)
    toast.success('Post has been published successfully')
  }

  //  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)
  //
  // const handleFileSelect = () => {
  //   fileInputRef?.current?.click()
  // }
  //
  // const [image, setImage] = useState<null | string>(null)
  //
  // const onConvertInputFile = () => {
  //   if (photoToUpload) {
  //     setImage(URL.createObjectURL(photoToUpload))
  //   }
  // }
  //
  // const [uploadPhoto] = useUploadImageForPostMutation()
  //
  // const onLoadImage = async () => {
  //   if (image) {
  //     const res = await fetch(image)
  //     const blob = await res.blob()
  //     const file = new File([blob], `postImage.jpg`, { type: 'image/jpg' })
  //
  //     URL.revokeObjectURL(image)
  //
  //     await uploadPhoto({ file }).unwrap()
  //   }
  // }
  //
  // const loadFile = async () => {
  //   if (photoToUpload) {
  //     await uploadPhoto({ file: photoToUpload }).unwrap()
  //   }
  // }

  return (
    <div>
      <CreatePostDialog onOpenChange={setOpen} onPostPublished={onPostPublished} open={open} />
      <Button onClick={() => setOpen(true)} variant={'primary'}>
        Open Create post modal
      </Button>
      {/*<ImageUploader fileInputRef={fileInputRef} setPhotoToUpload={setPhotoToUpload} />*/}
      {/*<Button onClick={handleFileSelect} variant={'primary'}>*/}
      {/*  Select from computer*/}
      {/*</Button>*/}
      {/*<Button onClick={onConvertInputFile} variant={'primary'}>*/}
      {/*  Convert input file to url*/}
      {/*</Button>*/}
      {/*<Button onClick={onLoadImage}>Load image on server</Button>*/}
      {/*<Button onClick={loadFile}>Load file on server</Button>*/}
    </div>
  )
}
