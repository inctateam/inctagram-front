import { ReactNode } from 'react'

import { Header, LayoutContainer } from '@/layouts'
import { ScrollArea } from '@/shared/ui'
import { cn } from '@/shared/utils'

type Props = {
  auth?: boolean
  children: ReactNode
}

export const CenteredLayout = ({ auth = false, children }: Props) => {
  return (
    <div>
      {/* // <div className={'h-screen overflow-hidden'}> */}
      <Header auth={auth} />
      <ScrollArea>
        <LayoutContainer className={cn('sm:pt-6 pt-4')}>
          <main>{children}</main>
        </LayoutContainer>
      </ScrollArea>
    </div>
  )
}
