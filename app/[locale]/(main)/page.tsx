'use client'

import { useEffect } from 'react'

import { useMeQuery } from '@/features/auth/api'
import { PublicPage } from '@/features/home-page/ui/public-page'
import { Spinner } from '@/shared/ui'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data, error, isLoading } = useMeQuery()

  useEffect(() => {
    if (data) {
      router.push(`/profile/${data.userId}`)
    }
  }, [data, router])

  // 🔹 АВТОРИЗАЦИЯ GOOGLE ПРОДОЛЖАЕТСЯ И ЗАКАНЧИВАЕТСЯ НА СТРАНИЦЕ baseUrl/auth/google
  const code = searchParams.get('code')

  if (code) {
    router.push(`/auth/google?code=${code}`)

    return null
  }

  if (isLoading) {
    return <Spinner fullScreen />
  }

  if (error || !data) {
    return <PublicPage />
  }
}
