import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { DialogClose, closeVariants } from '@/shared/ui/modal/dialog-close'
import { DialogContent } from '@/shared/ui/modal/dialog-content'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from 'class-variance-authority'

export type ModalProps = {
  children?: ReactNode
  className?: string
  closePosition?: VariantProps<typeof closeVariants>['closePosition']
  dialogContentProps?: ComponentPropsWithoutRef<typeof DialogContent>
  onOpenChange?: (open: boolean) => void
  open?: boolean
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

export const Modal = ({
  children,
  closePosition,
  dialogContentProps,
  trigger,
  ...props
}: ModalProps) => {
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
