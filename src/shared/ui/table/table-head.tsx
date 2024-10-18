import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'

type Props = ComponentPropsWithoutRef<'thead'>

export const TableHead = forwardRef<ElementRef<'thead'>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <thead ref={ref} {...rest} className={cn('bg-dark-500', className)}>
        {children}
      </thead>
    )
  }
)
