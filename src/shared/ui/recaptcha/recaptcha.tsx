import GoogleReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

type RecaptchaProps = Partial<ReCAPTCHAProps>

const Recaptcha = (props: RecaptchaProps) => {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string

  const { sitekey = key, theme = 'dark', ...restProps } = props

  return <GoogleReCAPTCHA sitekey={sitekey} theme={theme} {...restProps} />
}

Recaptcha.displayName = 'Recaptcha'

export { Recaptcha, type RecaptchaProps }
