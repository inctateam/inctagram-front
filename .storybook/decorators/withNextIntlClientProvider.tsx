import { NextIntlClientProvider } from 'next-intl'
import { Decorator } from '@storybook/react'

export const withIntlProvider: Decorator = (Story, context) => (
  <NextIntlClientProvider locale={'en'}>
    <Story {...context} />
  </NextIntlClientProvider>
)
