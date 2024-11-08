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
  const [userEmail, setUserEmail] = useState('')
  // const userEmail = 'test@gmail.com'
  const [submitForm] = usePasswordRecoveryMutation()

  const onSubmitHandler = async (data: onSubmitArgs) => {
    const { email, token } = data

    try {
      const resData = await submitForm({ email, token }).unwrap()

      console.log(resData)

      if (resData?.status === 204) {
        console.log(resData)
        setUserEmail(email)
        setModalOpen(true)
        toast.success('Success')
      } else if (resData?.status === 403 || resData?.status === 409) {
        toast.error(`Status: ${resData.message}`)
      } else if (resData?.status === 400) {
        toast.error('Error 400')
        // toast.error(`Error: ${resData?.errorsMessages[0]?.message ?? '400'}`)
      }
    } catch (error: unknown) {
      console.log(error)
      toast.error('Unknown error')
    }
  }

  return isExpired ? (
    <PasswordRecoveryFormExpired resendEmail={resendEmail} userEmail={userEmail} />
  ) : (
    <PasswordRecoveryForm
      modalOpen={modalOpen}
      onSubmit={onSubmitHandler}
      setModalOpen={setModalOpen}
      userEmail={userEmail}
    />
  )
}
