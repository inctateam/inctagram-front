import { PublicPostsArgs, PublicPostsResponse } from '@/features/home-page/types'
import { instagramApi } from '@/services'

export const homePageApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    publicPosts: builder.query<PublicPostsResponse, PublicPostsArgs>({
      query: args => ({
        params: args,
        url: 'v1/public-posts/all/{endCursorPostId}',
      }),
    }),
  }),
})

export const { usePublicPostsQuery } = homePageApi
