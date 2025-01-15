import { MeResponse, SignUpArgs, PasswordRecoveryArgs, PasswordRecoveryResponse  } from '@/features/auth/types'
import { instagramApi } from '@/services'

export const authApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    codeValidationCheck: builder.mutation<void, string>({
      query: code => {
        return {
          body: { code },
          method: 'POST',
          url: 'v1/auth/code-validation-check',
        }
      },
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
    passwordRecovery: builder.mutation<PasswordRecoveryResponse, PasswordRecoveryArgs>({
      query: data => {
        const { email, token } = data

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

export const { useCodeValidationCheckMutation, useMeQuery, usePasswordRecoveryMutation, useSignupMutation } = authApi
