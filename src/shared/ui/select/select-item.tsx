import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { typographyVariants } from '@/shared/ui'
import { cn } from '@/shared/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>

export const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ children, className, ...props }, ref) => (
    <SelectPrimitive.Item
      className={cn(
        'rounded-sm px-2.5 py-1.5 outline-none cursor-pointer',
        'hover:bg-dark-300 hover:text-accent-500',
        'focus:bg-accent focus:text-accent-500',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        typographyVariants({ variant: 'regular16' }),
        className
      )}
      ref={ref}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
)

SelectItem.displayName = SelectPrimitive.Item.displayName
