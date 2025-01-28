'use client'
import { toast } from 'react-toastify'

import { useLoginMutation } from '@/features/auth/api'
import { SignInForm } from '@/features/auth/ui'
import { LoginFields } from '@/features/auth/ui/utils/login-shema'
import { ProgressBar } from '@/shared/ui'
import { useRouter } from 'next/navigation'

export type PropsTranslations = {
  messagesErrors: Record<string, string>
  translAuth: Record<string, string>
}
export const SignInPage = ({ ...rest }: PropsTranslations) => {
  const [login, { isLoading }] = useLoginMutation()
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
    <>
      {isLoading && <ProgressBar />}
      <SignInForm
        handleGithubLogin={handleGithubLogin}
        handleGoogleLogin={handleGoogleLogin}
        onSubmit={handleSubmit}
        {...rest}
      />
    </>
  )
}
