'use client'
import { toast } from 'react-toastify'

import { useLoginMutation } from '@/features/auth/api'
import { SignInForm } from '@/features/auth/ui'
import { LoginFields } from '@/features/auth/ui/utils/login-shema'
import { useRouter } from 'next/navigation'

export type PropsTranslations = {
  messagesErrors: Record<string, string>
  translAuth: Record<string, string>
}
export const SignInPage = ({ ...rect }: PropsTranslations) => {
  const [login] = useLoginMutation()
  const router = useRouter()

  const handleSubmit = async (data: LoginFields) => {
    try {
      const response = await login(data).unwrap()

      if (response) {
        localStorage.setItem('access_token', response.accessToken)
        router.push('/')
      }
    } catch (e) {
      toast.error(`Error logging in`)

      return e
    }
  }

  // 🔹 КОНСТАНТЫ ДЛЯ АВТОРИЗАЦИИ GOOGLE
  const CLIENT_ID = '272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com' // Client ID
  const REDIRECT_URL = `${window.location.origin}/auth/sign-in/google` // URL редиректа после входа
  const SCOPE = 'email profile' // Запрашиваемые данные

  const handleGoogleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&client_id=${CLIENT_ID}`

    window.location.assign(url) // 🔹 Перенаправляем пользователя на страницу авторизации
  }

  const handleGithubLogin = () => {
    const REDIRECT_URL = `${window.location.origin}/auth/sign-in/github`
    const url = `https://inctagram.work/api/v1/auth/github/login?redirect_url=${encodeURIComponent(REDIRECT_URL)}`

    window.location.assign(url)
  }

  return (
    <SignInForm
      handleGithubLogin={handleGithubLogin}
      handleGoogleLogin={handleGoogleLogin}
      onSubmit={handleSubmit}
      {...rect}
    />
  )
}
