'use client'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useRouter, useSearchParams } from 'next/navigation'

export const GitHubCallbackPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const email = searchParams.get('email')

    if (!accessToken || !email) {
      toast.error('GitHub authorization failed')
      router.push('/login')

      return
    }

    localStorage.setItem('access_token', accessToken)
    toast.success('Successfully logged in with GitHub!')
    router.push('/')
  }, [searchParams, router])

  return <p>Processing GitHub login...</p>
}
