import { instagramApi } from '@/services'

import {
  GetPostsByUserNameResponse,
  GetPublicPostsByUserNameResponse,
  GetPublicUserProfileResponse,
  GetUserByUserNameResponse,
  GetUserProfileResponse,
} from '../types/user-profile.types'

export const userProfileApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    getPostsByUserName: builder.query<GetPostsByUserNameResponse, string>({
      query: userName => ({
        method: 'GET',
        url: `v1/posts/${userName}`,
      }),
    }),
    getProfile: builder.query<GetUserProfileResponse, void>({
      query: () => ({
        method: 'GET',
        url: 'v1/users/profile',
      }),
    }),
    getProfileByUserName: builder.query<GetUserByUserNameResponse, string>({
      query: userName => ({
        method: 'GET',
        url: `v1/users/${userName}`,
      }),
    }),
    getPublicPostsByUserId: builder.query<
      GetPublicPostsByUserNameResponse,
      {
        endCursorPostId?: null | number
        pageSize?: number
        userId: number
      }
    >({
      forceRefetch: params => Boolean(params.currentArg?.endCursorPostId),
      merge: (currentCache, newItems) => ({
        ...currentCache,
        items: [...currentCache.items, ...newItems.items],
      }),
      query: ({ endCursorPostId, pageSize, userId }) => ({
        method: 'GET',
        params: { pageSize },
        url: `v1/public-posts/user/${userId}/${endCursorPostId || ''}`,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.userId}`
      },
      transformResponse: (response: GetPublicPostsByUserNameResponse) => response,
    }),
    getPublicUserProfile: builder.query<GetPublicUserProfileResponse, number>({
      query: profileId => ({
        method: 'GET',
        url: `v1/public-user/profile/${profileId}`,
      }),
    }),
  }),
})
export const {
  useGetPostsByUserNameQuery,
  useGetProfileByUserNameQuery,
  useGetProfileQuery,
  useGetPublicPostsByUserIdQuery,
  useGetPublicUserProfileQuery,
  useLazyGetPublicPostsByUserIdQuery,
} = userProfileApi
