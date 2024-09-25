import GoogleReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

export const Recaptcha = (props: Partial<ReCAPTCHAProps>) => {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string

  const { sitekey = key, theme = 'dark', ...restProps } = props

  return <GoogleReCAPTCHA sitekey={sitekey} theme={theme} {...restProps} />
}
