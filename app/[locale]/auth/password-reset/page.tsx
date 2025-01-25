import { PasswordResetPage } from '@/features/auth/ui'
import { useTranslations } from 'next-intl'

const PasswordReset = () => {
  const tErrors = useTranslations('auth.passwordReset.errors')
  const tScheme = useTranslations('auth.passwordReset.scheme')
  const tForm = useTranslations('auth.passwordReset.form')

  /*global IntlMessages*/
  const translatedForm: IntlMessages['auth']['passwordReset'] = {
    errors: {
      error: tErrors('error'),
      newPasswordSuccess: tErrors('newPasswordSuccess'),
      noCode: tErrors('noCode'),
      someError: tErrors('someError'),
    },
    form: {
      createNewPassword: tForm('createNewPassword'),
      description: tForm('description'),
      password: tForm('password'),
      passwordConfirm: tForm('passwordConfirm'),
      passwordReset: tForm('passwordReset'),
    },
    scheme: {
      dontMatch: tScheme('dontMatch'),
      max: tScheme('max'),
      min: tScheme('min'),
      regex: tScheme('regex'),
      required: tScheme('required'),
    },
  }

  return <PasswordResetPage translatedForm={translatedForm} />
}

export default PasswordReset
