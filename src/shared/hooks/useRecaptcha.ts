import { useCallback, useEffect, useRef, useState } from 'react'
import GoogleReCAPTCHA from 'react-google-recaptcha'

const useRecaptcha = () => {
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

    let tokenRefreshTimeout: NodeJS.Timeout | null = null

    if (captchaToken) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000) // 110 seconds
    }

    return () => {
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout)
      }
    }
  }, [captchaToken])

  return { captchaToken, handleRecaptcha, recaptchaRef }
}

export { useRecaptcha }
