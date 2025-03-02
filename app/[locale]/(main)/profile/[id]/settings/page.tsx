'use client'
import { useMeQuery } from '@/features/auth/api'
import { useGetMyProfileQuery } from '@/features/profile-settings-page/api'
import { ProfileSettings } from '@/features/profile-settings-page/ui'
import { ProgressBar } from '@/shared/ui'
import { redirect } from 'next/navigation'

export default function ProfileSettingsPage({ params }: { params: { id: string } }) {
  const { id } = params

  const { data: me, isError: isMeError, isLoading: isMeLoading } = useMeQuery()

  const { data: profileInfo } = useGetMyProfileQuery()

  if (isMeLoading || !profileInfo) {
    return <ProgressBar />
  }
  if (isMeError) {
    return <div>Error! Something went wrong</div>
  }
  const userId = me?.userId
  const paramsUserId = Number(id)

  if (!userId) {
    redirect('/auth/sign-in')
  }

  if (userId && paramsUserId !== userId) {
    redirect(`/profile/${userId}/settings`)
  }

  return <ProfileSettings profileInfo={profileInfo} />
}
