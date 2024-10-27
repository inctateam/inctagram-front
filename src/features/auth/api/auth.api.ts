import { MeResponse } from '@/features/auth/types'
import { instagramApi } from '@/services'

export const authApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
  }),
})

export const { useMeQuery } = authApi
