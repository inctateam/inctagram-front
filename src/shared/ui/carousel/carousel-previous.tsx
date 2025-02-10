import * as React from 'react'

import { ArrowIosBackOutline } from '@/assets/icons'
import { IconButton } from '@/shared/ui'
import { useCarousel } from '@/shared/ui/carousel/carousel'
import { cn } from '@/shared/utils'

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(({ className, ...props }, ref) => {
  const { canScrollPrev, orientation, scrollPrev } = useCarousel()

  return (
    <IconButton
      className={cn(
        'absolute h-12 w-12 rounded-none',
        orientation === 'horizontal'
          ? 'left-3 top-1/2 -translate-y-1/2'
          : 'top-3 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      color={'carousel'}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      ref={ref}
      {...props}
    >
      <ArrowIosBackOutline className={'h-12 w-12'} />
      <span className={'sr-only'}>Previous slide</span>
    </IconButton>
  )
})

CarouselPrevious.displayName = 'CarouselPrevious'
