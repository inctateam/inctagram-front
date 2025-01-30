'use client'
import { SignInForm } from '@/features/auth/ui'

export type PropsTranslations = {
  messagesErrors: Record<string, string>
  translAuth: Record<string, string>
}
export const SignInPage = ({ ...rest }: PropsTranslations) => {
  // 🔹 КОНСТАНТЫ ДЛЯ АВТОРИЗАЦИИ GOOGLE
  const CLIENT_ID = '535513477329-xxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com' // Client ID
  const REDIRECT_URL = `${window.location.origin}/auth/sign-ip/google` // URL редиректа после входа
  const SCOPE = 'email profile' // Запрашиваемые данные

  const handleGoogleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&client_id=${CLIENT_ID}`

    window.location.assign(url) // 🔹 Перенаправляем пользователя на страницу авторизации
  }

  const handleGithubLogin = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login') // 🔹 Перенаправляем на GitHub
  }

  return (
    <SignInForm
      handleGithubLogin={handleGithubLogin}
      handleGoogleLogin={handleGoogleLogin}
      {...rest}
    />
  )
}
