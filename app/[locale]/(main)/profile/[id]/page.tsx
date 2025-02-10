import { UserProfile } from '@/features/home-page/ui/user-profile'
import { ProfilePage } from '@/features/home-page/ui/user-profile/profile-page'

interface ProfileProps {
  params: { id: string }
}

const Profile = ({ params }: ProfileProps) => {
  const { id } = params

  return (
    <ProfilePage isAuth userId={Number(id)}>
      <UserProfile isAuth userId={Number(id)} />
    </ProfilePage>
  )
}

export default Profile
