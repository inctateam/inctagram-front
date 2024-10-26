'use client'
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogHeaderTitle,
  DialogProps,
} from '@/shared/ui'

type EmailSentModalOwnProps = {
  onOpenChange: DialogProps['onOpenChange']
  open: DialogProps['open']
  userEmail: string
}

export type EmailSentModalProps = EmailSentModalOwnProps &
  Omit<DialogProps, keyof EmailSentModalOwnProps>

export const EmailSentModal = ({ onOpenChange, open, userEmail }: EmailSentModalProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogHeaderTitle>Email sent</DialogHeaderTitle>
      <DialogBody className={'flex flex-col px-6 pt-7 pb-9 max-w-[378px] break-words gap-5'}>
        <div>We have sent a link to confirm your email to {userEmail}</div>
        <div className={'flex justify-end'}>
          <DialogClose asChild>
            <Button>Ok</Button>
          </DialogClose>
        </div>
      </DialogBody>
    </Dialog>
  )
}
