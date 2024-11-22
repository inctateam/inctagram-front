import { forwardRef } from 'react'
import GoogleReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

type RecaptchaProps = Partial<ReCAPTCHAProps>

const Recaptcha = forwardRef<GoogleReCAPTCHA, RecaptchaProps>((props, ref) => {
  // const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
  const key = '6LfJYVAqAAAAAAtBGIHWe2L_Ja080UuHKccUYQTs'

  const { sitekey = key, theme = 'dark', ...restProps } = props

  return <GoogleReCAPTCHA ref={ref} sitekey={sitekey} theme={theme} {...restProps} />
})

Recaptcha.displayName = 'Recaptcha'

export { Recaptcha, type RecaptchaProps }
