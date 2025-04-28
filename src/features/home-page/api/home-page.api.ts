import {
  PublicPostByUserIdArgs,
  PublicPostCommentsArgs,
  PublicPostCommentsResponse,
  PublicPostItem,
  PublicPostsArgs,
  PublicPostsResponse,
  PublicationsFollowersItem,
  PublicationsFollowersQueryArgs,
  PublicationsFollowersResponse,
  TotalCountRegisteredUsersResponse,
} from '@/features/home-page/types'
import { instagramApi } from '@/services'

export const homePageApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    publicPostComments: builder.query<PublicPostCommentsResponse, PublicPostCommentsArgs>({
      query: ({ postId, ...params }) => ({
        params,
        url: `v1/public-posts/${postId}/comments`,
      }),
    }),
    publicPosts: builder.query<PublicPostsResponse, PublicPostsArgs>({
      query: ({ endCursorPostId, ...params }) => ({
        params,
        url: `v1/public-posts/all/${endCursorPostId}`,
      }),
    }),
    publicPostsById: builder.query<PublicPostItem, { postId: number }>({
      query: ({ postId }) => ({
        url: `v1/public-posts/${postId}`,
      }),
    }),
    publicPostsByUserId: builder.query<PublicPostsResponse, PublicPostByUserIdArgs>({
      query: ({ endCursorPostId, userId, ...params }) => ({
        params,
        url: `v1/public-posts/user/${userId}/${endCursorPostId}`,
      }),
    }),
    publicationsFollowers: builder.query<
      PublicationsFollowersResponse,
      PublicationsFollowersQueryArgs
    >({
      query: () => ({
        url: 'v1/home/publications-followers',
      }),
    }),
    totalCountRegisteredUsers: builder.query<TotalCountRegisteredUsersResponse, void>({
      query: () => ({
        url: 'v1/public-user',
      }),
    }),
  }),
})

export const {
  usePublicPostCommentsQuery,
  usePublicPostsByIdQuery,
  usePublicPostsByUserIdQuery,
  usePublicPostsQuery,
  usePublicationsFollowersQuery,
  useTotalCountRegisteredUsersQuery,
} = homePageApi
