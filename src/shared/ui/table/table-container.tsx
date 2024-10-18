import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'

type Props = ComponentPropsWithoutRef<'table'>

export const TableContainer = forwardRef<ElementRef<'table'>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <table ref={ref} {...rest} className={cn('w-[972px] mx-auto', className)}>
        {children}
      </table>
    )
  }
)
