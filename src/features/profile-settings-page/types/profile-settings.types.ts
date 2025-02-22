import { Avatar } from '@/features/home-page/types'

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
  aboutMe: string
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  lastName: string
  region: string
  userName: string
}
