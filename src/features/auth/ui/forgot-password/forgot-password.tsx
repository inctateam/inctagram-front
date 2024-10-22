import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ForgotPasswordModal } from '@/shared/forms/forgot-password-form/forgot-password-modal'
import { Button, Card, ControlledTextField, Recaptcha, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const emailScheme = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

type ForgotPasswordFormValues = z.infer<typeof emailScheme>

type ForgotPasswordProps = {
  mt?: string
}

const ForgotPassword = (props: ForgotPasswordProps) => {
  const { mt = '32' } = props
  const [captchaToken, setCaptchaToken] = useState<null | string>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(emailScheme),
  })

  const onChangeCaptcha = (token: null | string) => {
    setCaptchaToken(token)
  }

  const onSubmitHandler = (data: ForgotPasswordFormValues) => {
    setUserEmail(data.email)
    setShowDialog(true)
  }

  return (
    <>
      <Card className={cn('flex flex-col items-center mx-auto gap-9', `mt-${mt}`)} variant={'auth'}>
        <Typography variant={'h1'}>Forgot Password</Typography>
        <form className={'w-full'} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={'min-h-28'}>
            <ControlledTextField
              control={control}
              error={!!errors.email?.message}
              helperText={
                errors.email?.message ??
                'Enter your email address and we will send you further instructions '
              }
              label={'Email'}
              name={'email'}
              placeholder={'example-email@gmail.com'}
              type={'email'}
            />
          </div>
          {userEmail && (
            <div>
              <Typography className={'mt-6'} variant={'regular14'}>
                The link has been sent by email. If you don’t receive an email send link again
              </Typography>
            </div>
          )}
          <div className={'flex flex-col gap-6 mt-[26px] mb-4'}>
            <Button className={'w-full'} type={'submit'}>
              {userEmail ? 'Send Link Again' : 'Send Link'}
            </Button>
            <Button asChild className={'w-full'} variant={'text'}>
              <a href={'/sign-in'}>Back to Sign In</a>
            </Button>
          </div>
          {!userEmail && (
            <div className={'flex justify-center py-1'}>
              <Recaptcha onChange={onChangeCaptcha} />
            </div>
          )}
        </form>
      </Card>
      {showDialog && (
        <ForgotPasswordModal
          email={userEmail}
          onOpenChange={() => setShowDialog(false)}
          open={showDialog}
        />
      )}
    </>
  )
}

export { ForgotPassword, type ForgotPasswordFormValues, emailScheme }
