import { ProfilePage } from '@/features/home-page/ui/user-profile/profile-page'

interface ProfileProps {
  params: { id: string }
}

const Profile = async ({ params }: ProfileProps) => {
  const { id } = params

  return <ProfilePage userId={Number(id)} />
}

export default Profile
