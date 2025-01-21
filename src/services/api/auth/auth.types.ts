export type LoginArgs = {
  email: string
  password: string
}
export type LoginResponse = {
  accessToken: string
}
export type ResponseMe = {
  email: string
  isBlocked: boolean
  userId: string
  userName: string
}
