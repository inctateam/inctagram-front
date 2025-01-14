import { MeResponse, SignUpArgs } from '@/features/auth/types'
import { instagramApi } from '@/services'

export const authApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
    signup: builder.mutation<void, SignUpArgs>({
      query: body => ({
        body,
        credentials: 'include',
        method: 'POST',
        url: '/v1/auth/registration',
      }),
    }),
  }),
})

export const { useMeQuery, useSignupMutation } = authApi
