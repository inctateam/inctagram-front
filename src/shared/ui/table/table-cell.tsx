import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'

type Props = ComponentPropsWithoutRef<'td'>

export const TableCell = forwardRef<ElementRef<'td'>, Props>(({ className, ...props }, ref) => {
  return <td className={cn('px-6 py-3', className)} ref={ref} {...props} />
})
