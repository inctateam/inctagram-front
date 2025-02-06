export interface PublicPostsImages {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export interface PublicPostsOwner {
  firstName: string
  lastName: string
}

export interface PublicPostsItems {
  avatarOwner: string
  avatarWhoLikes: string
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

export interface PublicPostsResponse {
  items: PublicPostsItems[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
export interface PublicPostsArgs {
  endCursorPostId?: number
  pageNumber?: number
  pageSize?: number
}
