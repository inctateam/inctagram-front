import {
  PublicationsFollowersArgs,
  PublicationsFollowersResponse,
} from '@/features/home-page/types'
import { instagramApi } from '@/services'

export const homePageApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    publicationsFollowers: builder.query<PublicationsFollowersResponse, PublicationsFollowersArgs>({
      query: () => ({
        url: 'v1/home/publications-followers',
      }),
    }),
  }),
})

export const { usePublicationsFollowersQuery } = homePageApi
