import { MeResponse, PasswordRecoveryArgs, PasswordRecoveryResponse } from '@/features/auth/types'
import { instagramApi } from '@/services'

export const authApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
    passwordRecovery: builder.mutation<PasswordRecoveryResponse, PasswordRecoveryArgs>({
      query: data => {
        const { email, token } = data

        console.log(token)

        return {
          body: { email },
          headers: {
            recaptchagooglev2: token,
          },
          method: 'POST',
          url: 'v1/auth/password-recovery',
        }
      },
    }),
  }),
})

export const { useMeQuery, usePasswordRecoveryMutation } = authApi
