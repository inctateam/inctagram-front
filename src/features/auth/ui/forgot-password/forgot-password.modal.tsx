import { Button, Dialog, DialogBody, DialogHeader, DialogProps, Typography } from '@/shared/ui'

type ForgotPasswordModalProps = {
  email: string
} & DialogProps

const ForgotPasswordModal = (props: ForgotPasswordModalProps) => {
  const { email, onOpenChange, open } = props

  const onClickHandler = () => {
    onOpenChange?.(false)
  }

  return (
    <>
      <Dialog onOpenChange={onOpenChange} open={open}>
        <DialogHeader>
          <Typography as={'h2'} variant={'h1'}>
            Email sent
          </Typography>
        </DialogHeader>
        <DialogBody className={'flex flex-col px-6 pt-7 pb-9 w-[378px] break-words gap-5'}>
          <div>We have sent a link to confirm your email to {email}</div>
          <div className={'flex justify-end'}>
            <Button onClick={onClickHandler}>Ok</Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  )
}

export { ForgotPasswordModal }
