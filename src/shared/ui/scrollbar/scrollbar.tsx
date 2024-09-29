'use client'

import * as React from 'react'

import { cn } from '@/shared/utils'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  { orientation?: 'horizontal' | 'vertical' } & React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.Root
  >
>(({ children, className, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    className={cn('relative overflow-hidden', className)}
    ref={ref}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className={'h-full w-full'}>
      {children}
    </ScrollAreaPrimitive.Viewport>

    <ScrollBar orientation={'horizontal'} />
    <ScrollBar orientation={'vertical'} />
  </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    className={cn(
      orientation === 'vertical' && 'flex h-full w-1 ',
      orientation === 'horizontal' && 'flex h-1 w-full flex-col ',
      className
    )}
    orientation={orientation}
    ref={ref}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        orientation === 'vertical' && 'relative flex-1 h-[45px] bg-light-900 rounded-sm',
        orientation === 'horizontal' && 'relative flex-1 h-5 w-[45px] bg-light-900 rounded-sm',
        'transition-colors'
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
