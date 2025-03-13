import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import * as RadixSeparator from '@radix-ui/react-separator'

type SeparatorProps = ComponentPropsWithoutRef<typeof RadixSeparator.Root>

const Separator = forwardRef<ElementRef<typeof RadixSeparator.Root>, SeparatorProps>(
  ({ className, ...rest }, ref) => {
    return (
      <RadixSeparator.Root
        {...rest}
        className={cn('h-px bg-dark-300 w-full', className)}
        ref={ref}
      />
    )
  }
)

export { Separator }
