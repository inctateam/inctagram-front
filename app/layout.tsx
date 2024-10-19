import { ReactNode } from 'react'

import { ToastProvider } from '@/shared/ui'

import '@/styles/globals.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body>
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
