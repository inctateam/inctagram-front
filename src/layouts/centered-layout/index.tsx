import { ReactNode } from 'react'

import { Header, LayoutContainer } from '@/layouts'
import { cn } from '@/shared/utils'

type Props = {
  children: ReactNode
  className?: string
}

export const CenteredLayout = ({ children, className }: Props) => {
  return (
    <div>
      <Header />
      <LayoutContainer className={cn('flex items-start justify-center pt-9', className)}>
        <main>{children}</main>
      </LayoutContainer>
    </div>
  )
}
