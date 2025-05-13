'use client'

import { useMeQuery } from '@/features/auth/api'
import { HomePage } from '@/features/home-page/ui/home-page'
import { PublicPage } from '@/features/home-page/ui/public-page'
import { Spinner } from '@/shared/ui'

export default function Home() {
  const { data: me, error, isLoading } = useMeQuery()

  if (isLoading) {
    return <Spinner fullScreen />
  }

  if (error || !me) {
    return <PublicPage me={me} />
  }

  return <HomePage />
}
