import { instagramApi } from '@/services'
import { LoginArgs, LoginResponse, ResponseMe } from '@/services/api/auth/auth.types'

export const authApi = instagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, LoginArgs>({
        query: args => ({ body: args, method: 'POST', url: 'v1/auth/login' }),
      }),
      logout: builder.mutation<void, void>({
        query: () => ({
          method: 'POST',
          url: 'v1/auth/logout',
        }),
      }),
      me: builder.query<ResponseMe, void>({
        providesTags: ['Me'],
        query: () => ({ method: 'GET', url: 'v1/auth/me' }),
      }),
    }
  },
})
export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
