'use client'
import { SignInForm } from '@/features/auth/ui'

export type PropsTranslations = {
  messagesErrors: Record<string, string>
  translAuth: Record<string, string>
}
export const SignInPage = ({ ...rest }: PropsTranslations) => {
  const handleGithubLogin = () => {}
  const handleGoogleLogin = () => {}

  return (
    <SignInForm
      handleGithubLogin={handleGithubLogin}
      handleGoogleLogin={handleGoogleLogin}
      {...rest}
    />
  )
}
