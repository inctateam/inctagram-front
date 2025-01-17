'use client'
import { useForm } from 'react-hook-form'

import { PasswordRecoveryArgs } from '@/features/auth/types'
import { EmailSentModal } from '@/features/auth/ui'
import { PATH } from '@/shared/constants'
import { useRecaptcha } from '@/shared/hooks/useRecaptcha'
import { Button, Card, ControlledTextField, Recaptcha, TextLink, Typography } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

const emailScheme = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

type PasswordRecoveryFormValues = z.infer<typeof emailScheme>

// type onSubmitArgs = {
//   email: string
//   recaptcha: string
// }

type PasswordRecoveryFormProps = {
  modalOpen: boolean
  onSubmit: ({ email, recaptcha }: PasswordRecoveryArgs) => void
  setModalOpen: (open: boolean) => void
  userEmail: string
}

const PasswordRecoveryForm = (props: PasswordRecoveryFormProps) => {
  const { modalOpen, onSubmit, setModalOpen, userEmail } = props
  const t = useTranslations('auth.ForgotPassword')

  const { captchaToken, handleRecaptcha, recaptchaRef } = useRecaptcha()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PasswordRecoveryFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(emailScheme),
  })

  const onSubmitHandler = (data: PasswordRecoveryFormValues) => {
    if (captchaToken) {
      onSubmit({ email: data.email, recaptcha: captchaToken })
      // refreshCaptcha()
    }
  }

  return (
    <>
      <Card className={'flex flex-col items-center gap-9 w-[378px]'} variant={'auth'}>
        <Typography variant={'h1'}>{t('forgotPassword')}</Typography>
        <form className={'w-full'} onSubmit={handleSubmit(onSubmitHandler)}>
          <ControlledTextField
            control={control}
            defaultValue={userEmail}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={userEmail || 'example-email@gmail.com'}
          />

          <Typography className={'mt-2 text-light-900'} variant={'regular14'}>
            {t('enterEmail')}
          </Typography>
          {userEmail && (
            <div>
              <Typography className={'mt-6'} variant={'regular14'}>
                {t('linkSent')}
              </Typography>
            </div>
          )}
          <div className={'flex flex-col gap-6 mt-[26px] mb-4'}>
            <Button className={'w-full'} disabled={!captchaToken} type={'submit'}>
              {userEmail ? t('sendLinkAgain') : t('sendLink')}
            </Button>
            <TextLink
              className={'text-base font-semibold hover:text-accent-300 hover:underline'}
              href={PATH.SIGN_IN}
              underline={false}
            >
              {t('backToSignIn')}
            </TextLink>
          </div>
          <div className={'flex justify-center py-1'}>
            <Recaptcha onChange={handleRecaptcha} ref={recaptchaRef} />
          </div>
        </form>
      </Card>
      <EmailSentModal
        onOpenChange={open => setModalOpen(open)}
        open={modalOpen}
        userEmail={userEmail}
      />
    </>
  )
}

export { PasswordRecoveryForm, type PasswordRecoveryFormValues }
