'use client'

import { useMeQuery } from '@/features/auth/api'
import { ProgressBar } from '@/shared/ui'

import { PublicPage } from '../public-page'
import { ProfilePage } from '../user-profile/profile-page'

export const HomePage = () => {
  const { data, error, isLoading } = useMeQuery()

  if (error || !data) {
    return <PublicPage />
  }
  if (isLoading) {
    return <ProgressBar />
  }

  return <ProfilePage userId={data.userId} />
}
