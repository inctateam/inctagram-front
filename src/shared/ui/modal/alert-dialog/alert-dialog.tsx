import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CloseOutline } from '@/assets/icons'
import { Button, ButtonProps, IconButton, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'
import { VariantProps, cva } from 'class-variance-authority'

type AlertDialogProps = {
  cancelButton?: ReactNode
  confirmButton?: ReactNode
  description?: string
  position?: VariantProps<typeof alertDialogVariants>['position']
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof RadixAlertDialog.Root>

const alertDialogVariants = cva(
  [
    'fixed flex flex-col max-w-[487px] bg-dark-300 border border-solid border-dark-100 py-3 rounded-sm',
  ],
  {
    variants: {
      defaultVariants: {
        position: 'bottom-left',
      },
      position: {
        ['bottom-left']: ['bottom-4 left-4'],
        ['bottom-right']: ['bottom-4 right-4'],
        ['center']: ['top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'],
        ['top-left']: ['top-4 left-4'],
        ['top-right']: ['top-4 right-4'],
      },
    },
  }
)

const AlertDialog = forwardRef<ElementRef<typeof RadixAlertDialog.Root>, AlertDialogProps>(
  (props, ref) => {
    const {
      cancelButton,
      confirmButton,
      description,
      onOpenChange,
      open,
      position = 'center',
      title,
      trigger,
      ...rest
    } = props

    return (
      <RadixAlertDialog.Root {...rest} onOpenChange={onOpenChange} open={open}>
        <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
        <RadixAlertDialog.Portal>
          <RadixAlertDialog.Overlay className={'fixed inset-0 bg-dark-900 opacity-60'} />
          <div className={cn(alertDialogVariants({ position }))} ref={ref}>
            <RadixAlertDialog.Content>
              <div className={'border-b-[1px] pb-3 border-solid border-b-dark-100 pl-6 pr-3'}>
                <div className={'flex h-9 justify-between'}>
                  <RadixAlertDialog.Title>
                    <Typography as={'span'} variant={'h1'}>
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
              <div>
                <RadixAlertDialog.Description className={'flex py-[30px] px-6 '}>
                  <Typography as={'span'} className={'break-words'} variant={'regular16'}>
                    {description}
                  </Typography>
                </RadixAlertDialog.Description>
              </div>
              <div className={'flex justify-end pb-3 gap-6 px-6'}>
                <RadixAlertDialog.Action asChild>{confirmButton}</RadixAlertDialog.Action>
                <RadixAlertDialog.Cancel asChild>{cancelButton}</RadixAlertDialog.Cancel>
              </div>
            </RadixAlertDialog.Content>
          </div>
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
