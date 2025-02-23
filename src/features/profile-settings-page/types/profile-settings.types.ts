import { Avatar } from '@/features/home-page/types'
import { Nullable } from '@/shared/types'
export interface GetMyProfileResponse {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export interface UpdateMyProfile {
  aboutMe: Nullable<string>
  city: Nullable<string>
  country: Nullable<string>
  dateOfBirth: Nullable<string>
  firstName: string
  lastName: string
  region: Nullable<string>
  userName: string
}
