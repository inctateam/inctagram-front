import { ProfileSettings } from '@/features/profile-settings-page/ui'

export default async function ProfileSettingsPage({ params }: { params: { id: string } }) {
  // const { id } = params
  //
  // const { data: me, isError: isMeError, isLoading: isMeLoading } = useMeQuery()
  //
  // if (isMeLoading) {
  //   return <ProgressBar />
  // }
  // if (isMeError) {
  //   return <div>Error! Something went wrong</div>
  // }
  // const userId = me?.userId
  // const paramsUserId = Number(id)
  //
  // if (!userId) {
  //   redirect('/auth/sign-in')
  // }
  //
  // if (userId && paramsUserId !== userId) {
  //   redirect(`/profile/${userId}/settings`)
  // }

  return <ProfileSettings params={params} />
}
