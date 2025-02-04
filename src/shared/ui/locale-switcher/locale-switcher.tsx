'use client'

import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons'
import { type AppLocale, LOCALES, LOCALES_NAMES } from '@/i18n/i18n.config'
import { usePathname, useRouter } from '@/i18n/routing'
import { Select, SelectItem } from '@/shared/ui'
import { useLocale } from 'next-intl'

const localeIcons = {
  en: <FlagUnitedKingdom />,
  ru: <FlagRussia />,
}

export const LocaleSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale() as AppLocale

  const handleLocaleChange = (value: AppLocale) => {
    router.replace(pathname, { locale: value })
  }

  return (
    <div>
      <Select defaultValue={locale} onValueChange={handleLocaleChange}>
        {LOCALES.map(loc => (
          <SelectItem key={loc} value={loc}>
            <span className={'mr-2'}>{localeIcons[loc]}</span> {LOCALES_NAMES[loc]}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
