import { PublicUserProfile } from '@/features/home-page/ui/user-profile'

interface ProfilePageProps {
  userId: number
}

export const ProfilePage = ({ userId }: ProfilePageProps) => {
  return <PublicUserProfile userId={userId} />
}
