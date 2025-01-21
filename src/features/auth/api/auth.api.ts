import { MeResponse, NewPassword, PasswordRecoveryArgs, SignUpArgs } from '@/features/auth/types'
import { instagramApi } from '@/services'

export const authApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    codeValidationCheck: builder.mutation<void, string>({
      query: code => {
        return {
          body: { recoveryCode: code },
          method: 'POST',
          url: 'v1/auth/check-recovery-code',
        }
      },
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
    newPassword: builder.mutation<void, NewPassword>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/new-password',
      }),
    }),
    passwordRecovery: builder.mutation<void, PasswordRecoveryArgs>({
      query: data => {
        const { email, recaptcha } = data

        return {
          body: { email, recaptcha },
          credentials: 'include',
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

export const {
  useCodeValidationCheckMutation,
  useMeQuery,
  useNewPasswordMutation,
  usePasswordRecoveryMutation,
  useSignupMutation,
} = authApi
