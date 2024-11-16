export interface MeResponse {
  email: string
  isBlocked: boolean
  userId: number
  username: string
}

export interface PasswordRecoveryArgs {
  baseUrl?: string
  email: string
  token: string
}

export type PasswordRecoveryResponse = {
  body?: {
    email: string
  }
  env?: string
  headers?: {
    recaptchagooglev2: string
  }
  message: string
  method?: string
  params?: Record<string, unknown>
  query?: Record<string, unknown>
  stack?: string
  status: number
  timestamp?: string
  url?: string
}

export type ValidationErrorResponse = {
  errorsMessages: [{ field: string; message: string }]
}
