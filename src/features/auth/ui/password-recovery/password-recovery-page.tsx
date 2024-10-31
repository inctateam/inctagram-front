'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import { usePasswordRecoveryMutation } from '@/features/auth/api'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'
import { PasswordRecoveryForm, onSubmitArgs } from './password-recovery-form'

type ApiPasswordRecoveryResponse = {
  data?: unknown
  message: string
  status: number
}

export const PasswordRecoveryPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const isExpired = false
  const resendEmail = () => {}
  const userEmail = 'test@gmail.com'
  const [submitForm] = usePasswordRecoveryMutation()

  const onSubmitHandler = async (data: onSubmitArgs): Promise<void> => {
    try {
      const resData = await submitForm({ email: data.email, token: data.token }).unwrap()

      toast.success('Submission successful' + resData)

      setModalOpen(true)
    } catch (error) {
      const apiError = error as ApiPasswordRecoveryResponse

      if ('status' in apiError) {
        if (apiError.status === 400) {
          toast.error('Input data has incorrect value')
        } else if (apiError.status === 403) {
          toast.error('reCAPTCHA verification failed')
        } else {
          toast.error(apiError.message || 'This user does not have existing email')
        }
      } else {
        toast.error('An unknown error occurred')
      }
    }
  }

  return isExpired ? (
    <PasswordRecoveryFormExpired resendEmail={resendEmail} userEmail={userEmail} />
  ) : (
    <PasswordRecoveryForm
      modalOpen={modalOpen}
      onSubmit={onSubmitHandler}
      setModalOpen={setModalOpen}
    />
  )
}
