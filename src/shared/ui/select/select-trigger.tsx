import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { ArrowIosDownOutline } from '@/assets/icons'
import { cn } from '@/shared/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'

const SelectValue = SelectPrimitive.Value

type SelectTriggerProps = {
  placeholder?: ReactNode
} & ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, placeholder, ...props }, ref) => (
  <SelectPrimitive.Trigger
    className={cn(
      `group bg-transparent flex justify-between items-center px-3 h-9
      text-light-100 border border-dark-100 border-solid rounded-t-sm`,
      `hover:text-light-900`,
      `focus-visible:text-light-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500`,
      `data-[state="open"]:border-light-100 data-[state="open"]:hover:text-light-900`,
      `data-[disabled]:text-dark-100 data-[disabled]:border-dark-100 data-[disabled]:cursor-none data-[disabled]:pointer-events-none`,
      `placeholder-dark-100`,
      className
    )}
    ref={ref}
    {...props}
  >
    <SelectValue placeholder={placeholder} />
    <SelectPrimitive.Icon asChild>
      <ArrowIosDownOutline
        className={'group-data-[state="open"]:rotate-180 transition-transform h-6 w-6'}
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName
