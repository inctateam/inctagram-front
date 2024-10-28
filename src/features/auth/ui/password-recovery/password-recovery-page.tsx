'use client'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'
import { PasswordRecoveryForm } from './password-recovery-form'

export const PasswordRecoveryPage = () => {
  // refactor later
  const isExpired = false
  const resendEmail = () => {}
  const userEmail = 'test@gmail.com'

  return isExpired ? (
    <PasswordRecoveryFormExpired resendEmail={resendEmail} userEmail={userEmail} />
  ) : (
    <PasswordRecoveryForm onSubmit={() => {}} />
  )
}
