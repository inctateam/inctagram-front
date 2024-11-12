import { ReactNode } from 'react'

import { AppLocale, LOCALES } from '@/i18n/i18n.config'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'

import '@/styles/globals.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

import { ClientRootLayout } from './client-root-layout'

export default async function ServerSideLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  if (!LOCALES.includes(locale as AppLocale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <ClientRootLayout locale={locale} messages={messages}>
          {children}
        </ClientRootLayout>
      </body>
    </html>
  )
}
