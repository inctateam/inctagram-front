import { ImageOutline } from '@/assets/icons'
import { Button, DialogBody, DialogHeader, Typography } from '@/shared/ui'

type AddFilesDialogContentProps = {
  handleFileSelect: () => void
  handleOpenDraft: () => void
}

export const AddFilesDialogContent = ({
  handleFileSelect,
  handleOpenDraft,
}: AddFilesDialogContentProps) => {
  return (
    <div className={'w-[492px] h-[564px]'}>
      <DialogHeader>
        <Typography variant={'h1'}>Add photo</Typography>
      </DialogHeader>
      <DialogBody className={'flex flex-col items-center'}>
        <div
          className={'w-[222px] h-[228px] flex justify-center items-center bg-dark-500 mt-16 mb-14'}
        >
          <ImageOutline height={36} width={36} />
        </div>

        <Button onClick={() => handleFileSelect()} variant={'primary'}>
          Select from computer
        </Button>

        <Button className={'mt-6'} onClick={() => handleOpenDraft()} variant={'outline'}>
          Open draft
        </Button>
      </DialogBody>
    </div>
  )
}
