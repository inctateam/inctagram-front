import { GetMyProfileResponse, UpdateMyProfile } from '@/features/profile-settings-page/types'
import { instagramApi } from '@/services'

export const profileSettingsApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<GetMyProfileResponse, void>({
      providesTags: ['MyProfile'],
      query: () => ({
        url: `v1/users/profile`,
      }),
    }),
    updateProfile: builder.mutation<void, UpdateMyProfile>({
      invalidatesTags: ['MyProfile'],
      query: ({ ...body }) => ({
        body,
        method: 'PUT',
        url: `v1/users/profile`,
      }),
    }),
  }),
})

export const { useGetMyProfileQuery, useUpdateProfileMutation } = profileSettingsApi
