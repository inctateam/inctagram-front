'use client'

import { Button, Dialog, Typography } from '@/shared/ui'
type Props = {
  onOpenChange: (isDeletePost: boolean) => void
  onOpenChangeDelete: () => void
  open: boolean
}
export const DeletePost = ({ onOpenChange, onOpenChangeDelete, open }: Props) => {
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
          Are you sure you want to delete this post?
        </Typography>
        <div className={'flex justify-end pr-6 pb-7 gap-6'}>
          <Button className={'w-24'} onClick={onOpenChangeDelete} variant={'outline'}>
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
