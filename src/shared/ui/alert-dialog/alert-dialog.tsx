import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CloseOutline } from '@/assets/icons'
import { Button, IconButton, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'
import { cva } from 'class-variance-authority'

type AlertDialogProps = {
  canselButtonName?: string
  confirmButtonName?: string
  description?: string
  onCansel?: () => void
  onConfirm?: () => void
  position?: 'bottom-left' | 'bottom-right' | 'center' | 'top-left' | 'top-right'
  title?: string
} & ComponentPropsWithoutRef<typeof RadixAlertDialog.Root>

const AlertDialogVariants = cva(
  [
    'fixed flex flex-col max-w-[487px] bg-dark-300 border-[1px] border-solid border-dark-100 py-3 rounded-[2px]',
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
      canselButtonName = 'No',
      confirmButtonName = 'Yes',
      description,
      onCansel,
      onConfirm,
      onOpenChange,
      open,
      position = 'center',
      title,
      ...rest
    } = props

    const onConfirmHandler = () => {
      onConfirm?.()
      onOpenChange?.(false)
    }
    const onCanselHandler = () => {
      onCansel?.()
      onOpenChange?.(false)
    }

    return (
      <RadixAlertDialog.Root {...rest} onOpenChange={onOpenChange} open={open}>
        <RadixAlertDialog.Portal>
          <RadixAlertDialog.Overlay className={'fixed inset-0 bg-dark-900 opacity-60'} />
          <div className={cn(AlertDialogVariants({ position }))} ref={ref}>
            <RadixAlertDialog.Content>
              <div className={'border-b-[1px] pb-3 border-solid border-b-dark-100 px-6'}>
                <div className={'flex h-9 justify-between '}>
                  <RadixAlertDialog.Title>
                    <Typography as={'span'} variant={'h1'}>
                      {title}
                    </Typography>
                  </RadixAlertDialog.Title>
                  <RadixAlertDialog.Cancel asChild>
                    <IconButton>
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
                <RadixAlertDialog.Action asChild>
                  <Button className={'px-6'} onClick={onConfirmHandler} variant={'outline'}>
                    {confirmButtonName}
                  </Button>
                </RadixAlertDialog.Action>
                <RadixAlertDialog.Cancel asChild>
                  <Button className={'px-6'} onClick={onCanselHandler} variant={'primary'}>
                    {canselButtonName}
                  </Button>
                </RadixAlertDialog.Cancel>
              </div>
            </RadixAlertDialog.Content>
          </div>
        </RadixAlertDialog.Portal>
      </RadixAlertDialog.Root>
    )
  }
)

export { AlertDialog, type AlertDialogProps }
