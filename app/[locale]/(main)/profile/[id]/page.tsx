import { PublicUserProfile } from '@/features/home-page/ui/user-profile'

interface ProfileProps {
  params: { id: string }
}

const Profile = ({ params }: ProfileProps) => {
  const { id } = params

  return <PublicUserProfile userId={Number(id)} />
}

export default Profile
