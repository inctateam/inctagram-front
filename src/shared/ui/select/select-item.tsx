import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'

type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>

export const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ children, className, ...props }, ref) => (
    <SelectPrimitive.Item
      className={cn(
        `
      px-3 py-1.5
      text-md 
      hover:text-primary-500 hover:bg-dark-300 hover:outline-none hover:text-accent-500
      cursor-pointer`,
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
