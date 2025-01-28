'use client'

import { SignUpForm } from '@/features/auth/ui'
export type SignUpPageProps = {
  translatedForm: {
    agreeToTerms: string
    and: string
    email: string
    errors: {
      agreesToTerms: string
      email: string
      password: string
      passwordConfirmation: string
      passwordMaxLength: string
      passwordMinLength: string
      requiredField: string
      usernameMaxLength: string
      usernameMinLength: string
    }
    haveAccount: string
    password: string
    passwordConfirmation: string
    privacyPolicy: string
    signIn: string
    signUp: string
    termsOfService: string
    title: string
    username: string
  }
}

export const SignUpPage = ({ ...rest }: SignUpPageProps) => {
  return <SignUpForm {...rest} />
}
