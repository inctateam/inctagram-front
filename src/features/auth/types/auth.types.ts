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
