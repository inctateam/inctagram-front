'use client'

import { SignUpForm } from '@/features/auth/ui'
export type SignUpPageProps = {
  translatedForm: Record<string, string>
}

export const SignUpPage = ({ ...rest }: SignUpPageProps) => {
  return <SignUpForm {...rest} />
}
