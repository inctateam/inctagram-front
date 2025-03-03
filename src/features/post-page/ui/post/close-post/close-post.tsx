'use client'

import { Button, Dialog, Typography } from '@/shared/ui'

type Props = {
  onOpenChange: (isClosePost: boolean) => void
  onOpenChangeEdit: (isClosePost: boolean) => void
  open: boolean
}

export const ClosePost = ({ onOpenChange, onOpenChangeEdit, open }: Props) => {
  return (
    <Dialog closePosition={'inside'} onOpenChange={() => onOpenChange(false)} open={open}>
      <div className={'flex flex-col w-[30rem] h-[100%] bg-dark-300 border border-dark-100'}>
        <Typography
          className={'flex items-center pl-6 h-[4rem] border-b border-dark-100'}
          variant={'h1'}
        >
          Close Post
        </Typography>
        <Typography className={'py-7 px-6'} variant={'regular16'}>
          Do you really want to close the edition of the publication? If you close changes won’t be
          saved
        </Typography>
        <div className={'flex justify-end pr-6 pb-7 gap-6'}>
          <Button className={'w-24'} onClick={() => onOpenChangeEdit(true)} variant={'outline'}>
            Yes
          </Button>
          <Button className={'w-24'} onClick={() => onOpenChange(false)} variant={'primary'}>
            No
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
