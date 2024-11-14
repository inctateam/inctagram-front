'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { SignInForm } from '@/features/auth/ui'
import { LoginFields } from '@/features/auth/ui/utils/login-shema'
import { useLoginMutation } from '@/services/api/auth/auth.api'
import { MeTest } from '@/shared/ui/me-test'
// import { useRouter } from 'next/navigation'

export type PropsTranslations = {
  messagesErrors: Record<string, string>
  translAuth: Record<string, string>
}
export const SignInPage = ({ ...rect }: PropsTranslations) => {
  const [login] = useLoginMutation()
  const [meTest, setMeTest] = useState<boolean>(false)
  // const router = useRouter()

  const handleSubmit = async (data: LoginFields) => {
    try {
      const response = await login(data).unwrap()

      if (response) {
        localStorage.setItem('access_token', response.accessToken)
      }

      // await router.push('/')
      setMeTest(true)
    } catch (e: any) {
      toast.error(`Error logging in. Status code: ${e.status}`)
    }
  }

  return <>{meTest ? <MeTest /> : <SignInForm onSubmit={handleSubmit} {...rect} />}</>
}
