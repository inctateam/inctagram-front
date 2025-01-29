import { DEFAULT_LOCALE, LOCALE_PREFIX, LOCALES } from '@/i18n/i18n.config'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

const routing = defineRouting({
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: LOCALE_PREFIX,
  locales: LOCALES,
})

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing)
