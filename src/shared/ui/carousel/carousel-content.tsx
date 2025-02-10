import * as React from 'react'

import { useCarousel } from '@/shared/ui/carousel/carousel'
import { cn } from '@/shared/utils'

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div className={'h-full overflow-hidden'} ref={carouselRef}>
      <div
        className={cn(
          'flex h-full ',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})

CarouselContent.displayName = 'CarouselContent'
