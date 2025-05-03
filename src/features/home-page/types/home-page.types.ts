//public posts
import { Nullable } from '@/shared/types'

export interface PublicPostsOwner {
  firstName: string
  lastName: string
}
export interface PublicPostItem {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: PublicPostsImages[]
  isLiked: boolean
  likesCount: number
  location: null | string
  owner: PublicPostsOwner
  ownerId: number
  updatedAt: string
  userName: string
}
export interface PublicPostsResponse extends DefaultResponse {
  items: PublicPostItem[]
}
export interface PublicPostByUserIdArgs extends PublicPostsArgs {
  userId: number
}

//comments
export interface PublicPostCommentsArgs extends PublicPostsArgs {
  postId: number
}
export interface PublicPostCommentsResponse {
  items: PublicPostComment[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
export interface PublicPostComment {
  answerCount: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

//common interface
export interface From {
  avatars: AvatarResponseType[]
  id: number
  username: string
}
export interface AvatarResponseType {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
export interface PublicPostsImages {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export interface DefaultResponse {
  pageSize: number
  totalCount: number
  totalUsers: number
}
export interface PublicPostsArgs {
  endCursorPostId?: number
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export interface TotalCountRegisteredUsersResponse {
  totalCount: number
}

//home page
export interface PublicationsFollowersQueryArgs {
  endCursorPostId?: number
  pageNumber?: number
  pageSize?: number
}
export interface PublicationsFollowersResponse {
  items: Nullable<Array<PublicationsFollowersItem>>
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
export interface PublicationsFollowersItem {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: PublicPostsImages[]
  isLiked: boolean
  likesCount: number
  location: null | string
  owner: PublicPostsOwner
  ownerId: number
  updatedAt: string
  userName: string
}
