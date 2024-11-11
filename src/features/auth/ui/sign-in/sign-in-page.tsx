'use client'
import { toast } from 'react-toastify'

import { SignInForm } from '@/features/auth/ui'
import { LoginFields } from '@/features/auth/ui/utils/login-shema'
import { useLoginMutation } from '@/services/api/auth/auth.api'
import { useRouter } from 'next/navigation'

export type PropsTranslations = {
  messagesErrors: Record<string, string>
  translAuth: Record<string, string>
}
export const SignInPage = ({ ...rect }: PropsTranslations) => {
  const [login] = useLoginMutation()
  const router = useRouter()

  const handleSubmit = async (data: LoginFields) => {
    console.log(data)
    try {
      const response = await login(data).unwrap()

      if (response) {
        localStorage.setItem('access_token', response.accessToken)
      }
      await router.push('/')
    } catch (e) {
      toast.error(`${e.data.errorsMessages[0].field}: ${e.data.errorsMessages[0].message}`)
    }
  }

  return <SignInForm onSubmit={handleSubmit} {...rect} />
}
