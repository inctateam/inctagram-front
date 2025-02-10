import { instagramApi } from '@/services'

import {
  GetPostsByUserNameResponse,
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
    getPublicUserProfile: builder.query<GetPublicUserProfileResponse, string>({
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
  useGetPublicUserProfileQuery,
} = userProfileApi
