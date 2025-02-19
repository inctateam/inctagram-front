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
      { endCursorPostId?: number; pageSize?: number; userId: number }
    >({
      query: ({ endCursorPostId, pageSize, userId }) => ({
        method: 'GET',
        params: { endCursorPostId, pageSize },
        url: `v1/public-posts/user/${userId}`,
      }),
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
} = userProfileApi
