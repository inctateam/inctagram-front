import { ReactNode } from 'react'

import { Header, LayoutContainer } from '@/layouts'
import { cn } from '@/shared/utils'

type Props = {
  children: ReactNode
}

export const AuthLayout = ({ children }: Props) => {
  return (
    <div className={'h-screen flex flex-col'}>
      <Header auth />
      <LayoutContainer className={cn('flex items-start justify-center flex-grow', 'sm:pt-9 pt-4')}>
        <main>{children}</main>
      </LayoutContainer>
    </div>
  )
}
