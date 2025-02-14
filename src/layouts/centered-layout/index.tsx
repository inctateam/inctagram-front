import { ReactNode } from 'react'

import { Header, LayoutContainer } from '@/layouts'
import { cn } from '@/shared/utils'

type Props = {
  auth?: boolean
  children: ReactNode
}

export const CenteredLayout = ({ auth = false, children }: Props) => {
  return (
    <>
      <Header auth={auth} />
      <LayoutContainer className={cn('sm:pt-6 pt-4')}>
        <main>{children}</main>
      </LayoutContainer>
    </>
  )
}
