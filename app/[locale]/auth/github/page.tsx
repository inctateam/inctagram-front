'use client'

import { Suspense, useEffect } from 'react'

import { PATH } from '@/shared/constants/app-paths'
import { ProgressBar } from '@/shared/ui'
import { useRouter, useSearchParams } from 'next/navigation'

const CallbackGithubPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const email = searchParams.get('email')

    if (accessToken && email) {
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('email', email)
    }
    router.push(PATH.ROOT)
  }, [searchParams, router])

  return <div></div>
}

const CallbackGithubPageWithSuspense = () => (
  <Suspense fallback={<ProgressBar />}>
    <CallbackGithubPage />
  </Suspense>
)

export default CallbackGithubPageWithSuspense
