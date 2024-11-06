'use client'
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogHeaderTitle,
  DialogProps,
} from '@/shared/ui'
import { useTranslations } from 'next-intl'

type EmailSentModalOwnProps = {
  onOpenChange: DialogProps['onOpenChange']
  open: DialogProps['open']
  userEmail: string
}

export type EmailSentModalProps = EmailSentModalOwnProps &
  Omit<DialogProps, keyof EmailSentModalOwnProps>

export const EmailSentModal = ({ onOpenChange, open, userEmail }: EmailSentModalProps) => {
  const t = useTranslations('auth')

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogHeaderTitle>{t('emailSentTitle')}</DialogHeaderTitle>
      <DialogBody className={'flex flex-col px-6 pt-7 pb-9 max-w-[378px] break-words gap-5'}>
        <div>
          {t('emailSentBody')} {userEmail}
        </div>
        <div className={'flex justify-end'}>
          <DialogClose asChild>
            <Button>Ok</Button>
          </DialogClose>
        </div>
      </DialogBody>
    </Dialog>
  )
}
