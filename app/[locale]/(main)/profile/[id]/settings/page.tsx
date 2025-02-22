'use client'
import { useMeQuery } from '@/features/auth/api'
import { useGetMyProfileQuery } from '@/features/profile-settings-page/api'
import { ProfileSettings } from '@/features/profile-settings-page/ui'
import { Spinner } from '@/shared/ui'
import { redirect } from 'next/navigation'

const ProfileSettigsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { data: me, isError: isMeError, isLoading: isMeLoading } = useMeQuery()

  const { data: profileInfo, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, {
    skip: isMeLoading || isMeError, // Пропускаем запрос, если me запрос в процессе или произошла ошибка
  })

  const userId = me?.userId
  const paramsUserId = Number(id)

  if (isMeLoading || isProfileLoading) {
    return <Spinner />
  }
  if (!userId) {
    redirect('/')
  }
  if (userId) {
    if (paramsUserId !== userId) {
      redirect(`/profile/${userId}/settings`)
    }
  }

  return <ProfileSettings profileInfo={profileInfo!} />
}

export default ProfileSettigsPage
