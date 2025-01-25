export interface MeResponse {
  email: string
  isBlocked: boolean
  userId: number
  username: string
}

export interface SignUpArgs {
  baseUrl?: string
  email: string
  password: string
  userName: string
}

export interface ConfirmEmailArgs {
  confirmationCode: string
}

export interface NewPasswordArgs {
  newPassword: string
  recoveryCode: string
}

export interface PasswordRecoveryArgs {
  baseUrl?: string
  email: string
  recaptcha: string
}
export interface FieldErrorResponse {
  data: {
    error?: string
    messages?: { field?: string; message: string }[]
    statusCode?: number
  }
  status: number
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
