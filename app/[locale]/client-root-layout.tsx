'use client'

import { ReactNode } from 'react'

import { StoreProvider } from '@/services'
import { ToastProvider } from '@/shared/ui'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

export const ClientRootLayout = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: string
  messages: AbstractIntlMessages
}) => {
  return (
    <StoreProvider>
      <GoogleOAuthProvider
        clientId={'272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com'}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastProvider />
          {children}
        </NextIntlClientProvider>
      </GoogleOAuthProvider>
    </StoreProvider>
  )
}
