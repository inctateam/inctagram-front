import { AvatarResponseType } from '@/features/home-page/types'
import { Nullable } from '@/shared/types'
export interface GetMyProfileResponse {
  aboutMe: Nullable<string>
  avatars: AvatarResponseType[]
  city: Nullable<string>
  country: Nullable<string>
  createdAt: string
  dateOfBirth: Nullable<string>
  firstName: Nullable<string>
  id: number
  lastName: Nullable<string>
  region: Nullable<string>
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
