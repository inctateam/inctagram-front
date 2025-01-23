'use client'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { NewPasswordArgs } from '@/features/auth/types'
import { Button, Card, ControlledPasswordTextField, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { TPasswordReset } from '../../../../../app/[locale]/auth/password-reset/page'

type PasswordResetSchemaType = TPasswordReset['scheme']

export const passwordResetSchema = ({ ...scheme }: PasswordResetSchemaType) =>
  z
    .object({
      confirmPassword: z.string({
        required_error: scheme.required,
      }),
      password: z
        .string({
          required_error: scheme.required,
        })
        .min(6, 'Minimum number of characters 6')
        .max(20, 'Maximum number of characters 20')
        .refine(password => /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password), scheme.regex),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: scheme.dontMatch,
      path: ['confirmPassword'],
    })

type FormValues = z.infer<ReturnType<typeof passwordResetSchema>>

type Props = {
  onSubmit: ({ newPassword, recoveryCode }: NewPasswordArgs) => void
  translatedForm: TPasswordReset
}

export const PasswordResetForm = ({ onSubmit, translatedForm }: Props) => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(passwordResetSchema(translatedForm.scheme)) })

  const onSubmitHandler = async ({ password }: FormValues) => {
    if (code) {
      onSubmit({ newPassword: password, recoveryCode: code })
    } else {
      toast.error(translatedForm.errors.noCode)
    }
  }

  return (
    <>
      <Card className={'flex flex-col items-center gap-9'} variant={'auth'}>
        <Typography variant={'h1'}>{translatedForm.form.passwordReset}</Typography>
        <form className={'w-full'} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={'flex flex-col gap-6 mb-2'}>
            <ControlledPasswordTextField
              control={control}
              error={!!errors.password}
              helperText={errors.password?.message}
              label={translatedForm.form.password}
              name={'password'}
            />
            <ControlledPasswordTextField
              control={control}
              error={!!errors.confirmPassword && !errors.password}
              helperText={
                !errors.password && errors.confirmPassword ? errors.confirmPassword.message : ''
              }
              label={translatedForm.form.passwordConfirm}
              name={'confirmPassword'}
            />
          </div>

          <Typography className={'text-light-900'} variant={'regular14'}>
            {translatedForm.form.description}
          </Typography>

          <Button
            className={cn('w-full mt-10', `${errors.password?.message && 'mt-6'}`)}
            type={'submit'}
          >
            {translatedForm.form.createNewPassword}
          </Button>
        </form>
      </Card>
    </>
  )
}
