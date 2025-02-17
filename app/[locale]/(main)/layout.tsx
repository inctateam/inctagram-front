'use client'
import React from 'react'

import { useMeQuery } from '@/features/auth/api'
import { CenteredLayout } from '@/layouts'
import { Sidebar } from '@/shared/ui/sidebar'

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  const { data } = useMeQuery()

  return (
    <>
      <CenteredLayout>
        <div className={'flex gap-6 justify-space-between w-full'}>
          {data && <Sidebar />}
          {children}
          {modal}
        </div>
      </CenteredLayout>
    </>
  )
}
