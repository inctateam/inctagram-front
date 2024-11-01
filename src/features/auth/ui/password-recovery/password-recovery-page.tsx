'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import { usePasswordRecoveryMutation } from '@/features/auth/api'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'
import { PasswordRecoveryForm, onSubmitArgs } from './password-recovery-form'

export const PasswordRecoveryPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const isExpired = false
  const resendEmail = () => {}
  const userEmail = 'test@gmail.com'
  const [submitForm] = usePasswordRecoveryMutation()

  const onSubmitHandler = async (data: onSubmitArgs): Promise<void> => {
    const { email, token } = data

    console.log('token: ' + token)
    const resData = await submitForm({ email, token })

    if (resData?.error) {
      console.log('Error' + resData.error)
      toast.error('Error')
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
