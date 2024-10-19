import { ReactNode } from 'react'

import { cn } from '@/shared/utils'

type Props = {
  children: ReactNode
  className?: string
}

export const Container = ({ children, className }: Props) => {
  return (
    <div className={cn('mx-auto w-full max-w-[1280px]', 'xl:px-[60px] px-4', className)}>
      {children}
    </div>
  )
}
