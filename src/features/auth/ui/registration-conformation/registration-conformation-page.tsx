'use client'
import { useEffect } from 'react'

import { useConfirmEmailMutation } from '@/features/auth/api'
import { Spinner } from '@/shared/ui'
import { useSearchParams } from 'next/navigation'

import { EmailConfirmed } from './email-confirmed'
import { LinkExpired } from './link-expired'

export const RegistrationConformationPage = () => {
  const searchParams = useSearchParams()

  const [confirmEmail, { isError, isLoading, isSuccess }] = useConfirmEmailMutation()

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      confirmEmail({ confirmationCode: code })
    }
  }, [])

  return (
    <>
      {isLoading && <Spinner fullScreen />}
      {isSuccess && <EmailConfirmed />}
      {isError && <LinkExpired />}
    </>
  )
}
