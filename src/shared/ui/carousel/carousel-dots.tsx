'use client'

import React from 'react'

import { useCarousel } from '@/shared/ui'
import { cn } from '@/shared/utils'

export const CarouselDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }) => {
    const { api, scrollTo, selectedIndex } = useCarousel()

    return (
      <div className={'absolute -mt-8 flex items-center justify-center w-full'}>
        <div
          className={cn(
            'z-50 flex items-center justify-center gap-3 bg-dark-500/20 p-2',
            className
          )}
          {...props}
        >
          {api
            ?.scrollSnapList()
            .map((_, index) => (
              <span
                className={cn(
                  'h-2 w-2 rounded-full cursor-pointer',
                  index === selectedIndex ? 'bg-accent-500 ' : 'bg-light-100'
                )}
                key={index}
                onClick={() => scrollTo(index)}
              />
            ))}
        </div>
      </div>
    )
  }
)

CarouselDots.displayName = 'CarouselDots'
