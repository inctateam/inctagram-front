import { Avatar } from '@/features/home-page/ui/user-profile/types/user-profile.types'

export type GetUsersResponse = {
  items: {
    avatars: Avatar[]
    createdAt: string
    firstName: string
    id: number
    lastName: string
    userName: string
  }[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type GetUserByNameResponse = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  region: string
  userName: string
}
