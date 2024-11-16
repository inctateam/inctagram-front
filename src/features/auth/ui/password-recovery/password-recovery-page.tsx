'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { usePasswordRecoveryMutation } from '@/features/auth/api'
import { PasswordRecoveryResponse, ValidationErrorResponse } from '@/features/auth/types'
import { useRouter } from 'next/navigation'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'
import { PasswordRecoveryForm, onSubmitArgs } from './password-recovery-form'

export const PasswordRecoveryPage = () => {
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)
  const [recoveryCode, setRecoveryCode] = useState<null | string>(null)
  const [isExpired, setIsExpired] = useState(false)
  const resendEmail = () => {}
  const [userEmail, setUserEmail] = useState('')
  const [submitForm] = usePasswordRecoveryMutation()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const code = query.get('recoveryCode')

    setRecoveryCode(code)
    if (code !== null && isExpired) {
      setIsExpired(true)
    }
  }, [])
  if (recoveryCode !== null && !isExpired) {
    router.push('/password-reset')
  }
  const onSubmitHandler = async (data: onSubmitArgs) => {
    const { email, token } = data

    try {
      const resData = await submitForm({ email, token }).unwrap()

      if (resData === null) {
        setUserEmail(email)
        setModalOpen(true)
        toast.success('Success')
      }
    } catch (error) {
      if ((error as PasswordRecoveryResponse)?.status === 400) {
        const err = error as ValidationErrorResponse

        toast.error(`Error 400: ${err.errorsMessages?.[0]?.message ?? 'Validation error'}`)
      } else if ((error as PasswordRecoveryResponse)?.status === 403) {
        toast.error('Error 403: reCAPTCHA verification failed or token is invalid')
      } else if ((error as PasswordRecoveryResponse)?.status === 409) {
        toast.error('Error 409: Not existed email')
      } else {
        toast.error('Unknown Error')
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
      userEmail={userEmail}
    />
  )
}
