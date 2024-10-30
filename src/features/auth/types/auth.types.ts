export interface MeResponse {
  email: string
  isBlocked: boolean
  userId: number
  username: string
}

export interface PasswordRecoveryArgs {
  email: string
  recaptcha: string
}
