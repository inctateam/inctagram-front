import { ReactNode } from 'react'

import { StoreProvider } from '@/services'
import { ToastProvider } from '@/shared/ui'
import { NextIntlClientProvider } from 'next-intl'

import '@/styles/globals.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  return (
    <StoreProvider>
      <html lang={locale}>
        <body>
          <NextIntlClientProvider locale={locale}>
            <ToastProvider />
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  )
}
