import { useCallback, useEffect, useRef, useState } from 'react'
import GoogleReCAPTCHA from 'react-google-recaptcha'

const useRecaptcha = (refreshTimeout = 110000) => {
  const [captchaToken, setCaptchaToken] = useState<null | string>(null)
  const recaptchaRef = useRef<GoogleReCAPTCHA | null>(null)

  const handleRecaptcha = useCallback((token: null | string) => {
    setCaptchaToken(token || '')
  }, [])

  const refreshCaptcha = useCallback(() => {
    try {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
        setCaptchaToken(null)
      }
    } catch (error) {
      console.error('Failed to reset recaptcha:', error)
    }
  }, [recaptchaRef])

  useEffect(() => {
    let tokenRefreshTimeout: ReturnType<typeof setTimeout> | null = null

    if (captchaToken) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, refreshTimeout)
    }

    return () => {
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout)
      }
    }
  }, [captchaToken, refreshTimeout, refreshCaptcha])

  return { captchaToken, handleRecaptcha, recaptchaRef, refreshCaptcha, setCaptchaToken }
}

export { useRecaptcha }
