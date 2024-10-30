'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import { usePasswordRecoveryMutation } from '@/features/auth/api'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'
import { PasswordRecoveryForm, onSubmitArgs } from './password-recovery-form'

export const PasswordRecoveryPage = () => {
  // refactor later
  const [modalOpen, setModalOpen] = useState(false)
  const isExpired = false
  const resendEmail = () => {}
  const userEmail = 'test@gmail.com'
  const [submitForm, { data: resData, error, isLoading }] = usePasswordRecoveryMutation()
  const onSubmitHandler = (data: onSubmitArgs) => {
    console.log(data)
    submitForm({ email: data.email, recaptcha: data.token })
      .unwrap()
      .then(resData => {
        console.log('res' + resData)
        setModalOpen(true)
      })
      .catch(error => {
        console.log('error' + error)
      })
  }

  if (error) {
    toast.error('error')
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
