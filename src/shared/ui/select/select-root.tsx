import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/shared/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'

type SelectRootProps = {
  children?: ReactNode
  className?: string
  disabled?: boolean
  open?: boolean
  title: string
} & ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

export const SelectRoot = ({
  children,
  className,
  disabled,
  open,
  title,
  ...props
}: SelectRootProps) => {
  return (
    <div id={title}>
      <label
        className={cn(
          `text-light-900 text-sm font-400 leading-6 tracking-normal text-left`,
          className
        )}
        htmlFor={title}
      >
        {title}
      </label>
      <SelectPrimitive.Root {...props} disabled={disabled} open={open}>
        {children}
      </SelectPrimitive.Root>
    </div>
  )
}

SelectRoot.displayName = SelectPrimitive.Root.displayName
