'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useCodeValidationCheckMutation, usePasswordRecoveryMutation } from '@/features/auth/api'
import { FieldErrorResponse, PasswordRecoveryArgs } from '@/features/auth/types'
import { ProgressBar, Spinner } from '@/shared/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'
import { PasswordRecoveryForm } from './password-recovery-form'

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
        .catch(() => {
          setIsExpired(true)
          toast.error(tToast('expiredCode'))
        })
    } else {
      setIsExpired(false)
    }
  }, [checkRecoveryCode, router, searchParams, tToast])

  const onSubmitHandler = async (data: PasswordRecoveryArgs) => {
    try {
      const resData = await submitForm({ ...data }).unwrap()

      if (resData === null) {
        setModalOpen(true)
        toast.success(tToast('success'))
      }
    } catch (error) {
      const apiError = error as FieldErrorResponse

      if (apiError?.data.messages?.[0]?.message) {
        toast.error(
          `Error ${apiError?.data.statusCode}: ${apiError.data.messages?.[0]?.message ?? tToast('recaptchaError')}`
        )
      } else {
        toast.error(tToast('unknownError'))
      }
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
