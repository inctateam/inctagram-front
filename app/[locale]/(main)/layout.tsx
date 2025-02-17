import React from 'react'

import { CenteredLayout } from '@/layouts'
import { Sidebar } from '@/shared/ui/sidebar'

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <>
      <CenteredLayout>
        <div className={'flex gap-6 justify-space-between w-full'}>
          <Sidebar />
          {children}
          {modal}
        </div>
      </CenteredLayout>
    </>
  )
}
