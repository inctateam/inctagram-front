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

  const onSubmitHandler = async (data: onSubmitArgs): Promise<void> => {
    const { email, token } = data

    console.log(token)
    try {
      const resData = await submitForm({ email, token })

      setModalOpen(true)
      if (resData.data) {
        console.log(resData)
        setUserEmail(email)
      } else if (resData.error) {
        if ('status' in resData.error) {
          // FetchBaseQueryError
          console.error('FetchBaseQueryError:', resData.error)
          toast.error(`Status: ${resData.error.status}`)
        } else {
          // SerializedError
          console.error('SerializedError:', resData.error)
          toast.error(`Error: ${resData.error.message}`)
        }
      }
    } catch (error) {
      console.error('Request error:', error)
      toast.error('Request error')
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
