'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

type ScrollAreaProps = {
  orientation?: 'horizontal' | 'vertical'
} & ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>

const ScrollArea = forwardRef<ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  ({ children, className, ...props }, ref) => (
    <ScrollAreaPrimitive.Root className={cn(' h-full w-full', className)} ref={ref} {...props}>
      <ScrollAreaPrimitive.Viewport className={'h-full w-full'}>
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollBar className={`h-2`} orientation={'horizontal'} />
      <ScrollBar className={`w-2`} orientation={'vertical'} />
    </ScrollAreaPrimitive.Root>
  )
)

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

type ScrollBarProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
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
        orientation === 'vertical' && 'flex-1 bg-dark-300 rounded-sm hover:bg-light-900',
        orientation === 'horizontal' && 'flex-1 bg-dark-300 rounded-sm  hover:bg-light-900',
        'transition-colors'
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
