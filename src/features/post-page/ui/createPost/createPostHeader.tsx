import { ArrowBackOutline } from '@/assets/icons'
import { Button, DialogHeader, IconButton, Typography } from '@/shared/ui'

type CreatePostHeaderProps = {
  handleBack: () => void
  handleNext: () => void
  title: string
}

export const CreatePostHeader = ({ handleBack, handleNext, title }: CreatePostHeaderProps) => {
  return (
    <DialogHeader className={'flex justify-center items-center relative'}>
      <IconButton className={'hover:bg-dark-100/70 absolute left-6'} onClick={() => handleBack()}>
        <ArrowBackOutline />
      </IconButton>
      <Typography variant={'h1'}>{title}</Typography>
      <Button className={'absolute right-6'} onClick={() => handleNext()} variant={'text'}>
        Next
      </Button>
    </DialogHeader>
  )
}
