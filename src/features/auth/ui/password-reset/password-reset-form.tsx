'use client'
import { useForm } from 'react-hook-form'

import { Button, Card, PasswordTextField, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

type FormData = {
  confirmPassword: string
  password: string
}

export const PasswordResetForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    return data
  }

  return (
    <>
      <Card className={'flex flex-col items-center gap-9'} variant={'auth'}>
        <Typography variant={'h1'}>Forgot Password</Typography>
        <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
          <div className={'flex flex-col gap-6 mb-2'}>
            <PasswordTextField
              label={'Password'}
              {...register('password', {
                minLength: {
                  message: 'Minimum number of characters 6',
                  value: 6,
                },
                pattern: {
                  message:
                    'Password must contain a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).+$/,
                },
                required: 'Password is required',
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              placeholder={'Password'}
            />
            <PasswordTextField
              label={'Password confirmation'}
              {...register('confirmPassword', {
                required: 'The passwords must match',
                validate: value => {
                  if (errors.password) {
                    return true
                  }

                  return value === watch('password') || 'The passwords must match'
                },
              })}
              error={!!errors.confirmPassword && !errors.password}
              helperText={
                !errors.password && errors.confirmPassword ? errors.confirmPassword.message : ''
              }
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
