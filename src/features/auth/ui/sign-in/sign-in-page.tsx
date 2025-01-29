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

  const handleGithubLogin = () => {}
  const handleGoogleLogin = () => {}

  return (
    <SignInForm
      handleGithubLogin={handleGithubLogin}
      handleGoogleLogin={handleGoogleLogin}
      onSubmit={handleSubmit}
      {...rect}
    />
  )
}
