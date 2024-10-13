import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { CloseOutline } from '@/assets/icons'
import { IconButton, Typography } from '@/shared/ui'
import { DialogBody } from '@/shared/ui/dialog/dialog-body'
import { DialogClose, closeVariants } from '@/shared/ui/dialog/dialog-close'
import { DialogContent } from '@/shared/ui/dialog/dialog-content'
import { DialogHeader } from '@/shared/ui/dialog/dialog-header'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from 'class-variance-authority'

export type ModalProps = {
  children?: ReactNode
  className?: string
  closePosition?: VariantProps<typeof closeVariants>['closePosition']
  onOpenChange?: (open: boolean) => void
  open?: boolean
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

export const Dialog = ({
  children,
  className,
  closePosition,
  title,
  trigger,
  ...props
}: ModalProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogContent>
        <DialogClose asChild closePosition={closePosition}>
          <IconButton aria-label={'Close'}>
            <CloseOutline />
          </IconButton>
        </DialogClose>
        {title && (
          <DialogHeader>
            <Typography as={'h2'} variant={'h1'}>
              {title}
            </Typography>
          </DialogHeader>
        )}
        <DialogBody className={className}>{children}</DialogBody>
      </DialogContent>
    </DialogPrimitive.Root>
  )
}
