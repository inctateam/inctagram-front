import { SignInPage } from '@/features/auth/ui'
import { useTranslations } from 'next-intl'

const SignIn = () => {
  const t = useTranslations('Auth')
  const tl = useTranslations('LoginSchema')
  const translAuth = {
    dontHaveAnAccount: t('dontHaveAnAccount'),
    email: t('email'),
    forgotPassword: t('signUp'),
    password: t('password'),
    signIn: t('signIn'),
    signUp: t('signUp'),
    usernameOrEmail: t('usernameOrEmail'),
  }
  const messagesErrors = {
    characterPassword: tl('characterPassword'),
    cyrillicNotAllowed: tl('cyrillicNotAllowed'),
    invalidEmail: tl('invalidEmail'),
    lowercasePassword: tl('lowercasePassword'),
    maxPassword: tl('maxPassword'),
    maxUsername: tl('maxUsername'),
    minPassword: tl('minPassword'),
    minUsername: tl('minUsername'),
    numberPassword: tl('numberPassword'),
    requiredField: tl('requiredField'),
    uppercasePassword: tl('uppercasePassword'),
  }

  return <SignInPage messagesErrors={messagesErrors} translAuth={translAuth} />
}

export default SignIn
