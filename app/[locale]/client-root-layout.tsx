'use client'

import { ReactNode } from 'react'

import { StoreProvider } from '@/services'
import { ToastProvider } from '@/shared/ui'
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
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ToastProvider />
        {children}
      </NextIntlClientProvider>
    </StoreProvider>
  )
}
