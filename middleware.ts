import { DEFAULT_LOCALE, LOCALE_PREFIX, LOCALES } from '@/i18n/i18n.config'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // Use this locale when we can't match
  // another with our user's preferred locales
  // and when no locale is explicitly set.
  defaultLocale: DEFAULT_LOCALE,

  // Automatic locale detection is enabled by
  // default. We're disabling it to keep things
  // simple for now. We'll enable it later when
  // false - we cover locale detection.
  localeDetection: false,

  localePrefix: LOCALE_PREFIX,
  // List all supported locales (en-us, ar-eg).
  locales: LOCALES,
})

// Our middleware only applies to routes that
// match the following:
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
