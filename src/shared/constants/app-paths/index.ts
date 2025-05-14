export const PATH = {
  CONFIRM_EMAIL: '/auth/registration-confirmation',
  MESSENGER: '/messenger',
  PASSWORD_RECOVERY: '/auth/recovery', // forgot password page
  PASSWORD_RESET: '/auth/password-reset', // creating new password
  PRIVACY_POLICY: '/privacy-policy',
  PROFILE: '/profile/:id',
  PROFILE_SEARCH: '/profile/:id/search',
  PROFILE_SETTINGS: '/profile/:id/settings',
  ROOT: '/',
  SIGN_IN: '/auth/sign-in', // login page
  SIGN_UP: '/auth/sign-up', // register new user
  TERMS_OF_SERVICE: '/terms-of-service',
} as const

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://content-universe.store'
