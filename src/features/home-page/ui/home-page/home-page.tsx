'use client'

import { useMeQuery } from '@/features/auth/api'
import { ProgressBar } from '@/shared/ui'
import { Sidebar } from '@/shared/ui/sidebar'

import { PublicPage } from '../public-page'
import { UserProfile } from './user-profile'

export const HomePage = () => {
  const { data, error, isLoading } = useMeQuery()

  if (error || !data) {
    return <PublicPage />
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      <div className={'flex gap-6 justify-center max-h-[660px]'}>
        <Sidebar />
        <UserProfile />
      </div>
    </>
  )
}
