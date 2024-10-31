import { MeResponse, PasswordRecoveryArgs } from '@/features/auth/types'
import { instagramApi } from '@/services'

export const authApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
    passwordRecovery: builder.mutation<void, PasswordRecoveryArgs>({
      query: data => {
        const { email, token } = data

        return {
          body: { email },
          headers: {
            recaptcha_google_v2: token,
          },
          method: 'POST',
          url: 'v1/auth/password-recovery',
        }
      },
    }),
  }),
})

export const { useMeQuery, usePasswordRecoveryMutation } = authApi
