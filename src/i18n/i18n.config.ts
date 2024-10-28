export const LOCALES = ['en', 'ru'] as const
export const DEFAULT_LOCALE = 'en'
export const LOCALE_PREFIX = 'as-needed'
export const LOCALES_NAMES = {
  en: 'English',
  ru: 'Русский',
}

export type AppLocale = (typeof LOCALES)[number]
