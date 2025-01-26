'use client'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useConfirmEmailMutation } from '@/features/auth/api'
import { Spinner } from '@/shared/ui'
import { useSearchParams } from 'next/navigation'

import { EmailConfirmed } from './email-confirmed'
import { LinkExpired } from './link-expired'

/*global IntlMessages*/
type Props = {
  translatedForm: IntlMessages['auth']['ResendConfirm']
}

export const RegistrationConformationPage = ({ translatedForm }: Props) => {
  const searchParams = useSearchParams()

  const [confirmEmail, { isError, isLoading, isSuccess }] = useConfirmEmailMutation()

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      confirmEmail({ confirmationCode: code })
    } else {
      toast.error(translatedForm.errors.badLink)
    }
  }, [])

  return (
    <>
      {isLoading && <Spinner fullScreen />}
      {isSuccess && <EmailConfirmed translatedForm={translatedForm} />}
      {isError && <LinkExpired translatedForm={translatedForm} />}
    </>
  )
}
