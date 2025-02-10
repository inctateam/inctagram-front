import * as React from 'react'

import { ArrowIosForwardOutline } from '@/assets/icons'
import { IconButton } from '@/shared/ui'
import { useCarousel } from '@/shared/ui/carousel/carousel'
import { cn } from '@/shared/utils'

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(({ className, ...props }, ref) => {
  const { canScrollNext, orientation, scrollNext } = useCarousel()

  return (
    <IconButton
      className={cn(
        'absolute h-12 w-12 rounded-none',
        orientation === 'horizontal'
          ? 'right-3 top-1/2 -translate-y-1/2'
          : 'bottom-3 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      color={'carousel'}
      disabled={!canScrollNext}
      onClick={scrollNext}
      ref={ref}
      {...props}
    >
      <ArrowIosForwardOutline className={'h-12 w-12'} />
      <span className={'sr-only'}>Next slide</span>
    </IconButton>
  )
})

CarouselNext.displayName = 'CarouselNext'
