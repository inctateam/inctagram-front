import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Typography } from '@/shared/ui'
import { DialogBody } from '@/shared/ui/modal/dialog-body'
import { DialogContent } from '@/shared/ui/modal/dialog-content'
import { DialogHeader } from '@/shared/ui/modal/dialog-header'
import { cn } from '@/shared/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export type ModalProps = {
  children?: ReactNode
  className?: string
  onOpenChange?: (open: boolean) => void
  open?: boolean
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

export const Dialog = ({ children, className, title, trigger, ...props }: ModalProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogContent>
        {title && (
          <DialogHeader>
            <Typography variant={'h1'}>{title}</Typography>
          </DialogHeader>
        )}
        <DialogBody className={cn('w-full', className)}>{children}</DialogBody>
      </DialogContent>
    </DialogPrimitive.Root>
  )
}
