import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { DialogClose, closeVariants } from '@/shared/ui/modal/dialog/dialog-close'
import { DialogContent } from '@/shared/ui/modal/dialog/dialog-content'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from 'class-variance-authority'

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
      <DialogContent {...dialogContentProps}>
        <DialogClose closePosition={closePosition} />
        {children}
      </DialogContent>
    </DialogPrimitive.Root>
  )
}
