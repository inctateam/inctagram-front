import { SignUpPage } from '@/features/auth/ui/sign-up/sign-up-page'
import { useTranslations } from 'next-intl'

const SignUp = () => {
  const t = useTranslations('auth.SignUp')
  const translatedForm = {
    agreeToTerms: t('agreeToTerms'),
    and: t('and'),
    email: t('email'),
    haveAccount: t('haveAccount'),
    password: t('password'),
    passwordConfirmation: t('passwordConfirmation'),
    privacyPolicy: t('privacyPolicy'),
    signIn: t('signIn'),
    signUp: t('signUp'),
    termsOfService: t('termsOfService'),
    title: t('title'),
    username: t('username'),
  }

  return <SignUpPage translatedForm={translatedForm} />
}

export default SignUp
