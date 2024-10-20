import { ReactNode } from 'react'

import { Header, LayoutContainer } from '@/layouts'
import { cn } from '@/shared/utils'

type Props = {
  children: ReactNode
}

export const CenteredLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <LayoutContainer className={cn('sm:pt-6 pt-4')}>
        <main>{children}</main>
      </LayoutContainer>
    </div>
  )
}
