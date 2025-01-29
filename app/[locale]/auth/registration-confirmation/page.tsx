import { RegistrationConformationPage } from '@/features/auth/ui'
import { useTranslations } from 'next-intl'

const ConfirmEmail = () => {
  const tErrors = useTranslations('auth.ResendConfirm.errors')
  const tForm = useTranslations('auth.ResendConfirm.form')

  /*global IntlMessages*/
  const translatedForm: IntlMessages['auth']['ResendConfirm'] = {
    errors: {
      badLink: tErrors('badLink'),
      error: tErrors('error'),
      someError: tErrors('someError'),
    },
    form: {
      congratulations: tForm('congratulations'),
      emailConfirmed: tForm('emailSent'),
      emailSent: tForm('emailSent'),
      emailSentDescription: tForm('emailSentDescription'),
      linkExpiredDescription1: tForm('linkExpiredDescription1'),
      linkExpiredDescription2: tForm('linkExpiredDescription2'),
      resendLink: tForm('resendLink'),
      signIn: tForm('signIn'),
    },
  }

  return <RegistrationConformationPage translatedForm={translatedForm} />
}

export default ConfirmEmail
