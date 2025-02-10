import {
  PublicPostByUserIdArgs,
  PublicPostCommentsArgs,
  PublicPostCommentsResponse,
  PublicPostItem,
  PublicPostsArgs,
  PublicPostsResponse,
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
      query: args => ({
        params: args,
        url: 'v1/public-posts/all',
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
  }),
})

export const {
  usePublicPostCommentsQuery,
  usePublicPostsByIdQuery,
  usePublicPostsByUserIdQuery,
  usePublicPostsQuery,
} = homePageApi
