'use client'

import { ChangeEvent } from 'react'

import { type AppLocale, LOCALES, LOCALES_NAMES } from '@/i18n/i18n.config'
import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'

const _LocaleSwitcher = ({ locale }: { locale: AppLocale }) => {
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    const locale = e.currentTarget.value as AppLocale

    router.replace(pathname, { locale })
  }

  return (
    <div>
      <select className={'text-dark-500'} onChange={changeLocale} value={locale}>
        {LOCALES.map(loc => (
          <option key={loc} value={loc}>
            {LOCALES_NAMES[loc]}
          </option>
        ))}
      </select>
    </div>
  )
}

export const LocaleSwitcher = () => {
  const locale = useLocale() as AppLocale

  return <_LocaleSwitcher locale={locale} />
}
