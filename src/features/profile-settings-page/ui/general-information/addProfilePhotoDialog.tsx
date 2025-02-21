import { ImageOutline } from '@/assets/icons'
import { Button, Dialog, DialogHeaderTitle } from '@/shared/ui'

type Props = {
  onOpenChange: (open: boolean) => void
  open: boolean
}
const AddProfilePhotoDialog = ({ onOpenChange, open }: Props) => {
  const onCloseAddrofilePhoto = () => {
    onOpenChange(false)
  }

  return (
    <div className={'w-full'}>
      <Dialog
        dialogContentProps={{ className: 'w-[492px] h-[564px]' }}
        onOpenChange={onCloseAddrofilePhoto}
        open={open}
      >
        <DialogHeaderTitle>Add a Profile Photo</DialogHeaderTitle>

        <div className={'flex flex-col justify-center items-center gap-14 mt-20'}>
          <div className={'w-[222px] h-[228px] flex justify-center items-center bg-dark-500'}>
            <ImageOutline height={36} width={36} />
          </div>
          <Button>Select from Computer</Button>
        </div>
      </Dialog>
    </div>
  )
}

export default AddProfilePhotoDialog
