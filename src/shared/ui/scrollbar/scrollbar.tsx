'use client'

import * as React from 'react'

import { cn } from '@/shared/utils'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ children, className, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    className={cn('relative overflow-hidden', className)}
    ref={ref}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className={'h-full w-full rounded-[inherit]'}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar orientation={'vertical'} />
    <ScrollBar orientation={'horizontal'} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    className={cn(
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className
    )}
    orientation={orientation}
    ref={ref}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        orientation === 'vertical' && 'relative w-1 h-[45px] bg-light-900 rounded-sm',
        orientation === 'horizontal' && 'relative w-[45px] h-1 bg-light-900 rounded-sm',
        'transition-colors'
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
