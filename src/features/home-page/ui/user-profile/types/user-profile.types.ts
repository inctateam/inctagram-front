import { Nullable } from '@/shared/types'

export type GetUserProfileResponse = {
  aboutMe: string
  avatars: {
    createdAt: string
    fileSize: number
    height: number
    url: string
    width: number
  }[]
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

export type GetUserByUserNameResponse = {
  followersCount: number
  followingCount: number
  isFollowedBy: boolean
  isFollowing: boolean
  publicationsCount: number
} & Omit<GetUserProfileResponse, 'createdAt'>

export type GetPostsByUserNameResponse = {
  items: Post[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type Post = {
  avatarOwner: string //
  avatarWhoLikes: string[] //boolean?
  createdAt: string //
  description: string
  id: number //
  images: Image[] //
  isLiked: boolean //
  likesCount: number //
  location: string //
  owner: Owner //
  ownerId: number //
  updatedAt: string //
  userName: string //
}

export type Image = {
  createdAt: string //
  fileSize: number //
  height: number //
  uploadId: string //
  url: string //
  width: number //
}

export type Owner = {
  firstName: string
  lastName: string
}

export type GetPublicUserProfileResponse = {
  aboutMe: string
  avatars: {
    createdAt: string
    fileSize: number
    height: number
    url: string
    width: number
  }[]
  id: number
  userMetadata: {
    followers: number
    following: number
    publications: number
  }
  userName: string
}

export type GetPublicPostsByUserNameResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type UploadProfileAvatarResponse = {
  avatars: Avatar[]
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
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
