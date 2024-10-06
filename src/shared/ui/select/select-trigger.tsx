import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ArrowIosDownOutline } from '@/assets/icons'
import { cn } from '@/shared/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'

const SelectValue = SelectPrimitive.Value

type SelectTriggerProps = {
  disabled?: boolean
  isFocused?: boolean
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, disabled = false, isFocused = false, placeholder, ...props }, ref) => (
  <SelectPrimitive.Trigger
    className={cn(
      `
      group bg-transparent flex justify-between items-center px-3 w-[210px] h-9
      text-light-100 border border-dark-100 border-solid rounded-t-sm
      hover:text-light-900
      focus:outline outline-2 focus:outline-accent-500 focus:text-light-900`,
      `data-[state="open"]: data-[state="open"]:border-light-100 
       data-[state="open"]: hover:text-light-900
       `,
      disabled && `text-dark-100 border-dark-100 cursor-none pointer-events-none`,
      isFocused && `text-light-900 outline outline-2 outline-accent-500`,
      className
    )}
    disabled={disabled}
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
