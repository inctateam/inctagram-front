import * as React from 'react'

import { useCarousel } from '@/shared/ui/carousel/carousel'
import { cn } from '@/shared/utils'

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        aria-roledescription={'slide'}
        className={cn(
          'h-full min-w-0 shrink-0 grow-0 basis-full',
          orientation === 'horizontal' ? 'pl-4' : 'pt-4',
          className
        )}
        ref={ref}
        role={'group'}
        {...props}
      />
    )
  }
)

CarouselItem.displayName = 'CarouselItem'
