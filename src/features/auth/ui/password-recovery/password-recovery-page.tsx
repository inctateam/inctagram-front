'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useCodeValidationCheckMutation, usePasswordRecoveryMutation } from '@/features/auth/api'
import { PasswordRecoveryResponse, ValidationErrorResponse } from '@/features/auth/types'
import { Spinner } from '@/shared/ui'
import { useRouter } from 'next/navigation'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'
import { PasswordRecoveryForm, onSubmitArgs } from './password-recovery-form'

export const PasswordRecoveryPage = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [isExpired, setIsExpired] = useState<boolean | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [submitForm] = usePasswordRecoveryMutation()
  const [checkRecoveryCode] = useCodeValidationCheckMutation()

  const resendEmail = (email: string) => {
    setUserEmail(email)
    setIsExpired(false)
    router.push('password-recovery')
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const code = query.get('recoveryCode')

    if (code) {
      checkRecoveryCode(code)
        .unwrap()
        .then(() => {
          router.push('/password-reset')
        })
        .catch(() => {
          setIsExpired(true)
          toast.error('Recovery code is invalid or has expired.')
        })
    } else {
      setIsExpired(false)
    }
  }, [checkRecoveryCode, router])

  const onSubmitHandler = async (data: onSubmitArgs) => {
    const { email, token } = data

    try {
      const resData = await submitForm({ email, token }).unwrap()

      if (resData === null) {
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
    } finally {
      setUserEmail(email)
    }
  }

  if (isExpired === null) {
    return <Spinner />
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
