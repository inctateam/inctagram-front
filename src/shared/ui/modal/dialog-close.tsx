import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps, cva } from 'class-variance-authority'

export const closeVariants = cva(
  ['absolute top-3 right-4 data-[state=open]:text-muted-foreground'],
  {
    defaultVariants: {
      closePosition: 'inside',
    },
    variants: {
      closePosition: {
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
>(({ className, closePosition, ...props }, ref) => (
  <DialogPrimitive.Close
    className={cn(closeVariants({ className, closePosition }))}
    ref={ref}
    {...props}
  />
))
DialogClose.displayName = DialogPrimitive.Close.displayName
