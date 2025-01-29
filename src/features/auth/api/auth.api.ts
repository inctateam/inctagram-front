import {
  ConfirmEmailArgs,
  GoogleLoginArgs,
  GoogleLoginResponse,
  LoginArgs,
  LoginResponse,
  MeResponse,
  NewPasswordArgs,
  PasswordRecoveryArgs,
  ResendConfirmationArgs,
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
    googleLogin: builder.mutation<GoogleLoginResponse, GoogleLoginArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: `v1/auth/google/login`,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: args => ({ body: args, method: 'POST', url: 'v1/auth/login' }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: 'v1/auth/logout',
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
    resendConfirmation: builder.mutation<void, ResendConfirmationArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/registration-email-resending',
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

export const {
  useCodeValidationCheckMutation,
  useConfirmEmailMutation,
  useGoogleLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useNewPasswordMutation,
  usePasswordRecoveryMutation,
  useResendConfirmationMutation,
  useSignupMutation,
} = authApi
