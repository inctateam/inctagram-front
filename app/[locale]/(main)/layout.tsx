'use client'
import React from 'react'

import { Header, LayoutContainer } from '@/layouts'
import { cn } from '@/shared/utils'

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <LayoutContainer className={cn('sm:pt-6 pt-4')}>
        <main>
          {children}
          {modal}
        </main>
      </LayoutContainer>
    </>
  )
}
