'use client'
import { PasswordResetForm } from './password-reset-form'

/*global IntlMessages*/
export type PasswordResetPageProps = {
  translatedForm: IntlMessages['auth']['passwordReset']
}

export const PasswordResetPage = ({ translatedForm }: PasswordResetPageProps) => {
  return <PasswordResetForm translatedForm={translatedForm} />
}
