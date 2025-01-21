'use client'
import { useForm } from 'react-hook-form'

import { useNewPasswordMutation } from '@/features/auth/api'
import { Button, Card, ControlledPasswordTextField, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

type FormData = {
  confirmPassword: string
  password: string
}

export const PasswordResetForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>()

  const [submitNewPassword] = useNewPasswordMutation()

  const onSubmit = async (data: FormData) => {
    const { password } = data

    try {
      submitNewPassword({
        newPassword: 'test',
        recoveryCode: '12345',
      }).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Card className={'flex flex-col items-center gap-9'} variant={'auth'}>
        <Typography variant={'h1'}>Forgot Password</Typography>
        <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
          <div className={'flex flex-col gap-6 mb-2'}>
            <ControlledPasswordTextField
              control={control}
              error={!!errors.password}
              helperText={errors.password?.message}
              label={'Password'}
              name={'password'}
              placeholder={'Password'}
            />
            <ControlledPasswordTextField
              control={control}
              error={!!errors.confirmPassword && !errors.password}
              helperText={
                !errors.password && errors.confirmPassword ? errors.confirmPassword.message : ''
              }
              label={'Password confirmation'}
              name={'confirmPassword'}
              placeholder={'Password confirmation'}
            />
          </div>

          <Typography className={'text-light-900'} variant={'regular14'}>
            Your password must be between 6 and 20 characters
          </Typography>

          <Button
            className={cn('w-full mt-10', `${errors.password?.message && 'mt-6'}`)}
            type={'submit'}
          >
            Create new password
          </Button>
        </form>
      </Card>
    </>
  )
}
