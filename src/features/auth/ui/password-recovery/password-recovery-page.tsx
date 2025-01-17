'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useCodeValidationCheckMutation, usePasswordRecoveryMutation } from '@/features/auth/api'
import { PasswordRecoveryArgs, PasswordRecoveryError } from '@/features/auth/types'
import { Spinner } from '@/shared/ui'
import { useRouter, useSearchParams } from 'next/navigation'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'
import { PasswordRecoveryForm } from './password-recovery-form'

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
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const email = searchParams.get('email')

    if (code) {
      checkRecoveryCode(code)
        .unwrap()
        .then(() => {
          router.push(`password-reset?code=${code}&email=${email}`)
        })
        .catch(() => {
          setIsExpired(true)
          toast.error('Recovery code is invalid or has expired.')
        })
    } else {
      setIsExpired(false)
    }
  }, [checkRecoveryCode, router])

  const onSubmitHandler = async (data: PasswordRecoveryArgs) => {
    try {
      const resData = await submitForm({ ...data }).unwrap()

      if (resData === null) {
        setModalOpen(true)
        toast.success('Success')
      }
    } catch (error) {
      const apiError = error as PasswordRecoveryError

      if (apiError?.messages?.[0]?.message) {
        console.log('Ошибка Recaptcha:', apiError.messages[0].message)
        toast.error(
          `Error ${apiError?.statusCode}: ${apiError.messages?.[0]?.message ?? 'Recaptcha error'}`
        )
      } else {
        console.error('Неизвестная ошибка:', error)
        toast.error('Unknown Error')
      }
    } finally {
      setUserEmail(data.email)
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
