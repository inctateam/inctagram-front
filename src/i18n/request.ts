import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import { type AppLocale, LOCALES } from './i18n.config'

// Load the translation file for the active locale
// on each request and make it available to our
// pages, components, etc.
export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale as AppLocale)) {
    return notFound()
  }

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  }
})
