'use client'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGoogleLoginMutation } from '@/features/auth/api'
import { useRouter, useSearchParams } from 'next/navigation'

export const GoogleCallbackPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation()

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) {
      toast.error('Google authorization failed')
      router.push('/login')

      return
    }

    const handleGoogleAuth = async () => {
      try {
        const response = await googleLogin({ code, redirectUrl: window.location.origin }).unwrap()

        localStorage.setItem('access_token', response.accessToken)
        router.push('/')
      } catch (error) {
        toast.error('Error logging in with Google')
        router.push('/login')

        return error
      }
    }

    handleGoogleAuth().then()
  }, [searchParams, router, googleLogin])

  return <p>Processing Google login...</p>
}
