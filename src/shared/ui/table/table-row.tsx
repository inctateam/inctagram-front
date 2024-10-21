import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'

type Props = {
  isHeader?: boolean
} & ComponentPropsWithoutRef<'tr'>

export const TableRow = forwardRef<ElementRef<'tr'>, Props>(
  ({ children, className, isHeader, ...rest }, ref) => {
    return (
      <tr
        ref={ref}
        {...rest}
        className={cn(
          `text-sm ${isHeader ? 'font-semibold' : 'border border-t-0 border-dark-500'}`,
          className
        )}
      >
        {children}
      </tr>
    )
  }
)
