import { useRef } from 'react'

import { Button, DialogBody, DialogHeader, ImageUploader, Typography } from '@/shared/ui'

type AddFilesDialogContentProps = {
  handleOpenDraft: () => void
  setPhotoToUpload: (file: File) => void
}

export const AddFilesDialogContent = ({
  handleOpenDraft,
  setPhotoToUpload,
}: AddFilesDialogContentProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileSelect = () => {
    fileInputRef?.current?.click()
  }

  return (
    <div className={'w-[492px] h-[564px] flex flex-col'}>
      <DialogHeader>
        <Typography variant={'h1'}>Add photo</Typography>
      </DialogHeader>
      <DialogBody className={'flex-grow flex flex-col justify-around items-center px-6'}>
        <ImageUploader fileInputRef={fileInputRef} setPhotoToUpload={setPhotoToUpload} />
        <div className={'flex flex-col gap-6 w-[222px]'}>
          <Button onClick={handleFileSelect} variant={'primary'}>
            Select from computer
          </Button>
          <Button onClick={() => handleOpenDraft()} variant={'outline'}>
            Open draft
          </Button>
        </div>
      </DialogBody>
    </div>
  )
}
