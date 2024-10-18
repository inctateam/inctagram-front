import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'

type Props = {
  align?: 'left' | 'right'
} & ComponentPropsWithoutRef<'td'>

export const TableCell = forwardRef<ElementRef<'td'>, Props>(
  ({ align, children, className, ...rest }, ref) => {
    return (
      <td
        ref={ref}
        {...rest}
        className={cn(
          `py-3 w-48 ${align === 'right' ? 'text-right pr-20' : 'text-left'} pl-5`,
          className
        )}
      >
        {children}
      </td>
    )
  }
)
