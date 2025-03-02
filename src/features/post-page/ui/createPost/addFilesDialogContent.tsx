import { RefObject, useState } from 'react'

import { ImageOutline } from '@/assets/icons'
import { Button, DialogBody, DialogHeader, ImageUploader, Typography } from '@/shared/ui'

type AddFilesDialogContentProps = {
  fileInputRef: RefObject<HTMLInputElement>
  handleFileSelect: () => void
  handleOpenDraft: () => void
  setPhotoToUpload: (file: File) => void
}

export const AddFilesDialogContent = ({
  fileInputRef,
  handleFileSelect,
  handleOpenDraft,
  setPhotoToUpload,
}: AddFilesDialogContentProps) => {
  // const fileInputRef = useRef<HTMLInputElement | null>(null)
  //
  // const handleFileSelect = () => {
  //   fileInputRef?.current?.click()
  // }

  const [error, setError] = useState('')

  return (
    <div className={'w-[492px] h-[564px] flex flex-col'}>
      <DialogHeader>
        <Typography variant={'h1'}>Add photo</Typography>
      </DialogHeader>
      <DialogBody className={'flex-grow flex flex-col justify-around items-center px-6'}>
        <ImageUploader
          fileInputRef={fileInputRef}
          setError={setError}
          setPhotoToUpload={setPhotoToUpload}
        >
          <div className={'flex flex-col items-center justify-center gap-6'}>
            {error && (
              <div
                className={
                  'w-full flex justify-center bg-danger-900 border border-danger-500 py-2 px-6'
                }
              >
                <Typography variant={'bold14'}>{error}</Typography>
              </div>
            )}
            <div className={'w-[222px] h-[228px] flex justify-center items-center bg-dark-500'}>
              <ImageOutline height={36} width={36} />
            </div>
          </div>
        </ImageUploader>
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
