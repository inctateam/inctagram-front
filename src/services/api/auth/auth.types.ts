export type LoginArgs = {
  password: string
  usernameOrEmail: string
}
export type LoginResponse = {
  accessToken: string
}
export type ResponseMe = {
  email: string
  userId: string
  username: string
}
