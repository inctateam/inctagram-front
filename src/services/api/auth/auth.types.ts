export type LoginArgs = {
  loginOrEmail: string
  password: string
}
export type LoginResponse = {
  accessToken: string
}
export type ResponseMe = {
  email: string
  userId: string
  username: string
}
