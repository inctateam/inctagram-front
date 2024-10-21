import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'

export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ children, className, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        `
        w-[var(--radix-select-trigger-width)] h-[var(--radix-select-content-height)] border border-light-100 border-solid border-t-0 rounded-b-sm
        `,
        position === 'popper' && 'bg-dark-700 text-light-100 hover:text-light-900',
        className
      )}
      position={position}
      ref={ref}
      {...props}
    >
      <SelectPrimitive.Viewport className={cn(position === 'popper')}>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

SelectContent.displayName = SelectPrimitive.Content.displayName
