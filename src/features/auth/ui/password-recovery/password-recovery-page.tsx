'use client'

import { useEffect, useState } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useCodeValidationCheckMutation, usePasswordRecoveryMutation } from '@/features/auth/api'
import { PasswordRecoveryArgs } from '@/features/auth/types'
import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { ProgressBar, Spinner } from '@/shared/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'
import { PasswordRecoveryForm, PasswordRecoveryFormValues } from './password-recovery-form'

export const PasswordRecoveryPage = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [isExpired, setIsExpired] = useState<boolean | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [submitForm, { isLoading }] = usePasswordRecoveryMutation()
  const [checkRecoveryCode] = useCodeValidationCheckMutation()

  const resendEmail = (email: string) => {
    setUserEmail(email)
    setIsExpired(false)
    router.push('recovery')
  }
  const searchParams = useSearchParams()
  const tToast = useTranslations('auth.ForgotPassword.toastMessages')

  useEffect(() => {
    const code = searchParams.get('code')
    const email = searchParams.get('email')

    if (code) {
      checkRecoveryCode(code)
        .unwrap()
        .then(() => {
          router.push(`password-reset?code=${code}&email=${email}`)
        })
        .catch((error: unknown) => {
          setIsExpired(true)
          handleRequestError(error, undefined)
        })
    } else {
      setIsExpired(false)
    }
  }, [checkRecoveryCode, router, searchParams, tToast])

  const onSubmitHandler = async (
    data: PasswordRecoveryArgs,
    setError: UseFormSetError<PasswordRecoveryFormValues>
  ) => {
    try {
      const resData = await submitForm({ ...data }).unwrap()

      if (resData === null) {
        setModalOpen(true)
      }
    } catch (error: unknown) {
      handleRequestError(error, setError, ['baseUrl', 'recaptcha'])
    } finally {
      setUserEmail(data.email)
    }
  }

  if (isExpired === null) {
    return <Spinner fullScreen />
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      {isExpired ? (
        <PasswordRecoveryFormExpired resendEmail={resendEmail} userEmail={userEmail} />
      ) : (
        <PasswordRecoveryForm
          modalOpen={modalOpen}
          onSubmit={onSubmitHandler}
          setModalOpen={setModalOpen}
          userEmail={userEmail}
        />
      )}
    </>
  )
}
