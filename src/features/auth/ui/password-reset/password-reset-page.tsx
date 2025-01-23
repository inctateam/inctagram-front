'use client'
import { toast } from 'react-toastify'

import { useNewPasswordMutation } from '@/features/auth/api'
import { FieldErrorResponse, NewPasswordArgs } from '@/features/auth/types'

import { TPasswordReset } from '../../../../../app/[locale]/auth/password-reset/page'
import { PasswordResetForm } from './password-reset-form'

export type PasswordResetPageProps = {
  translatedForm: TPasswordReset
}

export const PasswordResetPage = ({ translatedForm }: PasswordResetPageProps) => {
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
            toast(translatedForm.errors.newPasswordSuccess)
          })
      } catch (error) {
        const fieldError = error as FieldErrorResponse

        if (fieldError?.data.messages?.[0]?.message) {
          toast.error(
            `${translatedForm.errors.error} ${fieldError?.data.statusCode}: ${fieldError.data.messages?.[0]?.message}`
          )
        } else {
          toast.error(translatedForm.errors.someError)
        }
      }
    }
  }

  return <PasswordResetForm onSubmit={onSubmitHandler} translatedForm={translatedForm} />
}
