export interface MeResponse {
  email: string
  isBlocked: boolean
  userId: number
  username: string
}
export interface SignUpArgs {
  email: string
  password: string
  username: string
}
