'use client'

import { GithubLogo, GoogleLogo } from '@/assets/icons'
import { baseUrl } from '@/shared/constants'
import { IconButton } from '@/shared/ui'

export const OAuth2 = () => {
  // 🔹 АВТОРИЗАЦИЯ GITHUB
  const handleGithubLogin = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }
  // 🔹 АВТОРИЗАЦИЯ GOOGLE
  const handleGoogleLogin = () => {
    // 🔹 КОНСТАНТЫ ДЛЯ АВТОРИЗАЦИИ GOOGLE
    const CLIENT_ID = '272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com' // Client ID
    const REDIRECT_URL = `${baseUrl}/oauth-callback-google` // URL редиректа после входа
    const SCOPE = 'email profile' // Запрашиваемые данные
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`

    window.location.assign(url) // 🔹 Перенаправляем пользователя на страницу авторизации
  }

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
