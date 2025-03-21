export interface MeResponse {
  email: string
  isBlocked: boolean
  userId: number
  username: string
}

export interface SignUpArgs {
  email: string
  password: string
  userName: string
}

export interface ConfirmEmailArgs {
  confirmationCode: string
}

export interface ResendConfirmationArgs {
  email: string
}

export interface NewPasswordArgs {
  newPassword: string
  recoveryCode: string
}

export interface PasswordRecoveryArgs {
  email: string
  recaptcha: string
}

export interface LoginArgs {
  email: string
  password: string
}
export interface LoginResponse {
  accessToken: string
}
export interface GoogleLoginResponse {
  accessToken: string
  email: string
}
export interface GoogleLoginArgs {
  code: string
  redirectUrl: string
}
export interface GithubLoginArgs {
  redirect_url: string
}

// export type PasswordRecoveryResponse = {
//   body?: {
//     email: string
//   }
//   env?: string
//   headers?: {
//     recaptchagooglev2: string
//   }
//   message: string
//   method?: string
//   params?: Record<string, unknown>
//   query?: Record<string, unknown>
//   stack?: string
//   status: number
//   timestamp?: string
//   url?: string
// }
//
// export type ValidationErrorResponse = {
//   errorsMessages: [{ field: string; message: string }]
// }
