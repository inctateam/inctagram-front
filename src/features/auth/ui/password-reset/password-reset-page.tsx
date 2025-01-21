'use client'
import { toast } from 'react-toastify'

import { useNewPasswordMutation } from '@/features/auth/api'
import { FieldErrorResponse, NewPasswordArgs } from '@/features/auth/types'

import { PasswordResetForm } from './password-reset-form'

export const PasswordResetPage = () => {
  const [submitNewPassword] = useNewPasswordMutation()

  const onSubmitHandler = async (data: NewPasswordArgs) => {
    const { newPassword, recoveryCode } = data

    if (recoveryCode) {
      try {
        await submitNewPassword({
          newPassword,
          recoveryCode,
        })
          .unwrap()
          .then(() => {
            toast('success')
          })
      } catch (error) {
        const fieldError = error as FieldErrorResponse

        if (fieldError?.data.messages?.[0]?.message) {
          toast.error(
            `Error ${fieldError?.data.statusCode}: ${fieldError.data.messages?.[0]?.message}`
          )
        } else {
          toast.error('Some error')
        }
      }
    }
  }

  return <PasswordResetForm onSubmit={onSubmitHandler} />
}
