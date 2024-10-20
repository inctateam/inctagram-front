import { useForm } from 'react-hook-form'

import { Button } from '../button'
import { PasswordTextField } from '../text-field'

type FormData = {
  confirmPassword: string
  password: string
}

export const CreateNewPassword = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form
      className={`w-[330px] h-9 flex flex-col ${!errors.password?.message && 'gap-6'}`}
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <Button className={`${errors.password?.message && 'mt-6'}`} type={'submit'}>
        Sign Up
      </Button>
    </form>
  )
}
