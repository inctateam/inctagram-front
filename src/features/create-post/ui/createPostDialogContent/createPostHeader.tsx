import { ArrowBackOutline } from '@/assets/icons'
import { Button, DialogHeader, IconButton, Typography } from '@/shared/ui'
import { useTranslations } from 'next-intl'

type CreatePostHeaderProps = {
  handleBack: () => void
  handleNext?: () => void
  publish?: boolean
  title: string
}

export const CreatePostHeader = ({
  handleBack,
  handleNext,
  publish,
  title,
}: CreatePostHeaderProps) => {
  const t = useTranslations('CreatePost')

  return (
    <DialogHeader className={'flex justify-center items-center relative'}>
      <IconButton className={'hover:bg-dark-100/70 absolute left-6'} onClick={() => handleBack()}>
        <ArrowBackOutline />
      </IconButton>
      <Typography variant={'h1'}>{title}</Typography>
      {!publish && (
        <Button className={'absolute right-6'} onClick={() => handleNext?.()} variant={'text'}>
          {t('next')}
        </Button>
      )}
      {publish && (
        <Button
          className={'absolute right-6'}
          form={'publish-form'}
          type={'submit'}
          variant={'text'}
        >
          {t('publish')}
        </Button>
      )}
    </DialogHeader>
  )
}
