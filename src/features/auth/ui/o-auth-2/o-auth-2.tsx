'use client'

import { toast } from 'react-toastify'

import { GithubLogo, GoogleLogo } from '@/assets/icons'
import { useGoogleLoginMutation } from '@/features/auth/api'
import { baseUrl } from '@/shared/constants'
import { IconButton } from '@/shared/ui'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter, useSearchParams } from 'next/navigation'

export const OAuth2 = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loginWithGoogle] = useGoogleLoginMutation()

  // 🔹 АВТОРИЗАЦИЯ GITHUB
  const handleGithubLogin = () => {
    const redirectUrl = encodeURIComponent(window.location.origin + '/auth')

    window.location.assign(
      `https://inctagram.work/api/v1/auth/github/login?redirect_url=${redirectUrl}`
    )
  }

  // 🔹 АВТОРИЗАЦИЯ GOOGLE
  const handleSuccess = async () => {
    // 🔹 КОНСТАНТЫ ДЛЯ АВТОРИЗАЦИИ GOOGLE
    const CLIENT_ID = '272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com' // Client ID
    const REDIRECT_URL = baseUrl // URL редиректа после входа
    const SCOPE = 'email profile' // Запрашиваемые данные

    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`

    window.location.assign(url) // 🔹 Перенаправляем пользователя на страницу авторизации
    const code = searchParams.get('code')

    if (!code) {
      toast.error('Google authorization failed')
      router.push('/login')

      return
    }
    try {
      const res = await loginWithGoogle({ code, redirectUrl: baseUrl }).unwrap()

      localStorage.setItem('access_token', res.accessToken)
      localStorage.setItem('email', res.email)
      router.push('/')
    } catch {
      toast.error('Error logging in with Google')
      router.push('/login')
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: handleSuccess,
  })

  return (
    <div className={'flex w-full justify-center space-x-[60px] mt-3 mb-6'}>
      <IconButton className={'text-4xl'} onClick={handleGithubLogin}>
        <GithubLogo />
      </IconButton>

      <IconButton className={'text-4xl'} onClick={handleGoogleLogin}>
        <GoogleLogo />
      </IconButton>
    </div>
  )
}
