import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CloseOutline } from '@/assets/icons'
import { Button, ButtonProps, IconButton, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'
import { AlertDialogProps as AlertDialogRootProps } from '@radix-ui/react-alert-dialog'
import { VariantProps, cva } from 'class-variance-authority'

type AlertDialogProps = {
  cancelButton?: ReactNode
  checkbox?: ReactNode // Add a prop for the checkbox
  confirmButton?: ReactNode
  defaultOpen?: AlertDialogRootProps['defaultOpen']
  description?: string
  onOpenChange?: AlertDialogRootProps['onOpenChange']
  open?: AlertDialogRootProps['open']
  position?: VariantProps<typeof alertDialogVariants>['position']
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>

const alertDialogVariants = cva(
  [
    'fixed flex flex-col max-w-[438px] bg-dark-300 border border-solid border-dark-100 py-3 rounded-sm z-50',
  ],
  {
    variants: {
      defaultVariants: {
        position: 'bottom-left',
      },
      position: {
        bottomLeft: ['bottom-4 left-4'],
        bottomRight: ['bottom-4 right-4'],
        center: ['top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'],
        topLeft: ['top-4 left-4'],
        topRight: ['top-4 right-4'],
      },
    },
  }
)

const AlertDialog = forwardRef<ElementRef<typeof RadixAlertDialog.Content>, AlertDialogProps>(
  (props, ref) => {
    const {
      cancelButton,
      checkbox,
      confirmButton,
      defaultOpen,
      description,
      onOpenChange,
      open,
      position = 'center',
      title,
      trigger,
      ...rest
    } = props

    return (
      <RadixAlertDialog.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
        <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
        <RadixAlertDialog.Portal>
          <RadixAlertDialog.Overlay className={'fixed inset-0 bg-dark-900 opacity-60 z-50'} />
          <RadixAlertDialog.Content
            className={cn(alertDialogVariants({ position }))}
            {...rest}
            ref={ref}
          >
            <div className={'border-b-[1px] pb-3 border-solid border-b-dark-100 pl-6 pr-3'}>
              <div className={'flex h-9 justify-between'}>
                <RadixAlertDialog.Title>
                  <Typography as={'h2'} variant={'h1'}>
                    {title}
                  </Typography>
                </RadixAlertDialog.Title>
                <RadixAlertDialog.Cancel asChild>
                  <IconButton className={'hover:bg-dark-100'}>
                    <CloseOutline />
                  </IconButton>
                </RadixAlertDialog.Cancel>
              </div>
            </div>
            <RadixAlertDialog.Description className={'flex py-[30px] px-6'}>
              <Typography
                as={'p'}
                className={'break-words whitespace-pre-wrap'}
                variant={'regular16'}
              >
                {description}
              </Typography>
            </RadixAlertDialog.Description>
            <div className={'flex justify-end pb-3 gap-6 px-6'}>
              {/* Render the checkbox here */}
              <div className={'flex items-center px-6'}>{checkbox}</div>
              <RadixAlertDialog.Action asChild>{confirmButton}</RadixAlertDialog.Action>
              <RadixAlertDialog.Cancel asChild>{cancelButton}</RadixAlertDialog.Cancel>
            </div>
          </RadixAlertDialog.Content>
        </RadixAlertDialog.Portal>
      </RadixAlertDialog.Root>
    )
  }
)

const CancelButton = ({ className, ...props }: ButtonProps) => {
  return <Button className={cn('px-6', className)} variant={'primary'} {...props} />
}

const ConfirmButton = ({ className, ...props }: ButtonProps) => {
  return <Button className={cn('px-6', className)} variant={'outline'} {...props} />
}

export { AlertDialog, type AlertDialogProps, CancelButton, ConfirmButton }
