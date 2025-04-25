'use client'

import { useEffect } from 'react'

import { useMeQuery } from '@/features/auth/api'
import { PublicPage } from '@/features/home-page/ui/public-page'
import { Spinner } from '@/shared/ui'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: me, error, isLoading } = useMeQuery()

  useEffect(() => {
    if (me) {
      router.push(`/profile/${me.userId}`)
    }
  }, [me, router])

  // 🔹 АВТОРИЗАЦИЯ GOOGLE ПРОДОЛЖАЕТСЯ И ЗАКАНЧИВАЕТСЯ НА СТРАНИЦЕ baseUrl/auth/google
  const code = searchParams.get('code')

  if (code) {
    router.push(`/auth/google?code=${code}`)

    return null
  }

  if (isLoading) {
    return <Spinner fullScreen />
  }

  if (error || !me) {
    return <PublicPage me={me} />
  }
}
