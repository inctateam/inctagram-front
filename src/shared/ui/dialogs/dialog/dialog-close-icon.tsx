import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CloseOutline } from '@/assets/icons'
import { IconButton } from '@/shared/ui'
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

const DefaultCloseButton = () => {
  return (
    <IconButton aria-label={'Close'}>
      <CloseOutline />
    </IconButton>
  )
}

export const DialogCloseIcon = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & VariantProps<typeof closeVariants>
>(
  (
    { asChild = true, children = DefaultCloseButton(), className, closePosition, ...props },
    ref
  ) => (
    <DialogPrimitive.Close
      asChild={asChild}
      className={cn(closeVariants({ className, closePosition }))}
      ref={ref}
      {...props}
    >
      {children}
    </DialogPrimitive.Close>
  )
)

DialogCloseIcon.displayName = 'DialogCloseIcon'
