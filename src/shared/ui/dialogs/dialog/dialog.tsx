import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from 'class-variance-authority'

import { DialogCloseIcon, closeVariants } from './dialog-close-icon'
import { DialogContent } from './dialog-content'

export type DialogProps = {
  children?: ReactNode
  closePosition?: VariantProps<typeof closeVariants>['closePosition']
  dialogContentProps?: ComponentPropsWithoutRef<typeof DialogContent>
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

export const Dialog = ({
  children,
  closePosition,
  dialogContentProps,
  trigger,
  ...props
}: DialogProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogContent aria-describedby={undefined} {...dialogContentProps}>
        <DialogCloseIcon closePosition={closePosition} />
        {children}
      </DialogContent>
    </DialogPrimitive.Root>
  )
}
