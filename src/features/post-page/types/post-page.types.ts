//posts
import { PublicPostItem } from '@/features/home-page/types'

export interface UserPostsArgs extends QueryParams {
  userName: string
}

export interface UserPostResponse extends ResponseParams {
  items: PublicPostItem[]
}

//Comments
export interface CommentItems {
  answerCount: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export interface GetPostCommentsArgs extends QueryParams {
  postId: number
}

export interface CommentsResponse extends ResponseParams {
  items: CommentItems[]
}

export interface CommentLikesItems {
  avatars: AvatarType[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export interface CommentLikesResponse {
  isLiked: boolean
  items: CommentLikesItems[]
  nextCursor: null
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

//Answers
export interface GetCommentAnswersArgs extends GetPostCommentsArgs {
  commentId: number
}

export interface AnswersResponse extends ResponseParams {
  items: Answer[]
}

export interface Answer {
  commentId: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
}

//Answer Likes
export interface AnswerLikesArgs extends GetCommentAnswersArgs {
  answerId: number
}

//Common
export interface QueryParams {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortDirection?: 'asd' | 'desc'
}

export interface ResponseParams {
  notReadCount: number
  pageSize: number
  totalCount: number
}

export interface From {
  avatars: AvatarType[]
  id: number
  username: string
}

export interface AvatarType {
  createdAt?: string
  fileSize?: number
  height?: number
  url?: string
  width?: number
}

export interface Image {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export interface UploadFileResponse {
  images: Image[]
}
export interface UploadPostLikeStatusArgs {
  likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'
  postId: number
}

export type PostLikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'
