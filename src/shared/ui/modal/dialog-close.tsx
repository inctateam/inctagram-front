import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps, cva } from 'class-variance-authority'

const closeVariants = cva(
  [
    'absolute right-4 top-4 rounded-sm transition-opacity focus:outline-none data-[state=open]:text-muted-foreground',
    'hover:text-accent-100 active:text-accent-500',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-700',
    'disabled:pointer-events-none disabled:text-dark-100',
  ],
  {
    defaultVariants: {
      closeIcon: 'none',
    },
    variants: {
      closeIcon: {
        inside: '',
        none: 'hidden',
        outside: 'translate-x-[50px] translate-y-[-50px]',
      },
    },
  }
)

export const DialogClose = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & VariantProps<typeof closeVariants>
>(({ className, closeIcon, ...props }, ref) => (
  <DialogPrimitive.Close
    className={cn(closeVariants({ className, closeIcon }))}
    ref={ref}
    {...props}
  />
))
DialogClose.displayName = DialogPrimitive.Close.displayName
