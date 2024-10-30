import { MeResponse, PasswordRecoveryArgs } from '@/features/auth/types'
import { instagramApi } from '@/services'
import { BaseQueryArg } from '@reduxjs/toolkit/query'

export const authApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
    passwordRecovery: builder.mutation<void, PasswordRecoveryArgs>({
      query: (user: { email: string; recaptcha: string }) => {
        return {
          body: { ...user },
          method: 'POST',
          url: 'v1/auth/password-recovery',
        }
      },
    }),
  }),
})

export const { useMeQuery, usePasswordRecoveryMutation } = authApi
