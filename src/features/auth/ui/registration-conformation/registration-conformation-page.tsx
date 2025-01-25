import { EmailConfirmed } from './email-confirmed'
import { LinkExpired } from './link-expired'

export const RegistrationConformationPage = () => {
  const isSuccess = false

  return isSuccess ? <EmailConfirmed /> : <LinkExpired />
}
