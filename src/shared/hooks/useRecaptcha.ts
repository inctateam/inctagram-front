import { useCallback, useEffect, useRef, useState } from 'react'
import GoogleReCAPTCHA from 'react-google-recaptcha'

const useRecaptcha = (refreshTimeout = 110000) => {
  const [captchaToken, setCaptchaToken] = useState<null | string>('')
  const recaptchaRef = useRef<GoogleReCAPTCHA | null>(null)

  const handleRecaptcha = useCallback((token: null | string) => {
    setCaptchaToken(token || '')
  }, [])

  useEffect(() => {
    const refreshCaptcha = () => {
      if (recaptchaRef.current && captchaToken) {
        recaptchaRef.current.reset()
        setCaptchaToken('')
      }
    }

    let tokenRefreshTimeout: ReturnType<typeof setTimeout> | null = null

    if (captchaToken) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, refreshTimeout)
    }

    return () => {
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout)
      }
    }
  }, [captchaToken, refreshTimeout])

  return { captchaToken, handleRecaptcha, recaptchaRef, setCaptchaToken }
}

export { useRecaptcha }
