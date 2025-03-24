'use client'

import { Suspense, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGoogleLoginMutation } from '@/features/auth/api'
import { decodeToken } from '@/features/auth/utils/decodeToken'
import { PATH, baseUrl } from '@/shared/constants'
import { ProgressBar } from '@/shared/ui'
import { useRouter, useSearchParams } from 'next/navigation'

const CallbackGooglePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loginWithGoogle] = useGoogleLoginMutation()

  useEffect(() => {
    const fetchData = async () => {
      const code = searchParams.get('code')

      if (code) {
        try {
          const res = await loginWithGoogle({ code, redirectUrl: baseUrl }).unwrap()

          localStorage.setItem('access_token', res.accessToken)
          localStorage.setItem('email', res.email)
          router.push(`/profile/${decodeToken(res.accessToken)?.userId}`)
        } catch {
          toast.error('Error logging in with Google')
          router.push(PATH.ROOT)
        }
      } else {
        toast.error('Google authorization failed')
        router.push(PATH.ROOT)

        return
      }
    }

    fetchData().then()
  }, [searchParams, router, loginWithGoogle])

  return <div></div>
}

const CallbackGooglePageWithSuspense = () => (
  <Suspense fallback={<ProgressBar />}>
    <CallbackGooglePage />
  </Suspense>
)

export default CallbackGooglePageWithSuspense
