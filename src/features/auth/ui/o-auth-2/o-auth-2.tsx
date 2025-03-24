'use client'

import { GithubLogo, GoogleLogo } from '@/assets/icons'
import { IconButton } from '@/shared/ui'

export const OAuth2 = () => {
  // 🔹 АВТОРИЗАЦИЯ GITHUB
  const handleGithubLogin = () => {
    const redirectUrl = encodeURIComponent(window.location.origin + '/auth')

    window.location.assign(
      `https://inctagram.work/api/v1/auth/github/login?redirect_url=${redirectUrl}`
    )
  }

  // 🔹 АВТОРИЗАЦИЯ GOOGLE
  const handleGoogleLogin = async () => {
    window.location.assign(
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=email+profile'
    ) // 🔹 Перенаправляем пользователя на страницу авторизации
  }

  return (
    <div className={'flex w-full justify-center space-x-[60px] mt-3 mb-6'}>
      <IconButton className={'text-4xl'} onClick={handleGithubLogin} type={'button'}>
        <GithubLogo />
      </IconButton>

      <IconButton className={'text-4xl'} onClick={handleGoogleLogin} type={'button'}>
        <GoogleLogo />
      </IconButton>
    </div>
  )
}
