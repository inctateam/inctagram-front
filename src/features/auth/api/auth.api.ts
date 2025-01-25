import {
  ConfirmEmailArgs,
  MeResponse,
  NewPasswordArgs,
  PasswordRecoveryArgs,
  SignUpArgs,
} from '@/features/auth/types'
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
    confirmEmail: builder.mutation<void, ConfirmEmailArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: `v1/auth/registration-confirmation`,
      }),
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
    newPassword: builder.mutation<void, NewPasswordArgs>({
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
  useConfirmEmailMutation,
  useMeQuery,
  useNewPasswordMutation,
  usePasswordRecoveryMutation,
  useSignupMutation,
} = authApi
