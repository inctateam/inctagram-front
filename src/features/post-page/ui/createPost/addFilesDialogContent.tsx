import { ImageOutline } from '@/assets/icons'
import { Button, DialogBody, DialogHeader, Typography } from '@/shared/ui'

type AddFilesDialogContentProps = {
  error: string
  handleFileSelect: () => void
  handleOpenDraft: () => void
}

export const AddFilesDialogContent = ({
  error,
  handleFileSelect,
  handleOpenDraft,
}: AddFilesDialogContentProps) => {
  return (
    <div className={'w-[492px] h-[564px] flex flex-col'}>
      <DialogHeader>
        <Typography variant={'h1'}>Add photo</Typography>
      </DialogHeader>
      <DialogBody className={'flex-grow flex flex-col justify-around items-center px-6'}>
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

        <div className={'flex flex-col gap-6'}>
          <Button className={'w-[222px]'} onClick={() => handleFileSelect()} variant={'primary'}>
            Select from computer
          </Button>

          <Button className={'w-[222px]'} onClick={() => handleOpenDraft()} variant={'outline'}>
            Open draft
          </Button>
        </div>
      </DialogBody>
    </div>
  )
}
