import { useState } from 'react'
import { ComponentPropsWithoutRef } from 'react'

import { CloseOutline } from '@/assets/icons'
import { IconButton, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { VariantProps, cva } from 'class-variance-authority'

type AlertProps = {
  message: string
  onClose?: () => void
  position?: 'bottom-left' | 'bottom-right' | 'center' | 'top-left' | 'top-right'
  type: 'error' | 'success'
} & ComponentPropsWithoutRef<typeof AlertDialog.Root> &
  VariantProps<typeof AlertVariants>

const AlertVariants = cva(
  ['fixed flex justify-between items-center wrap w-[387px] h-12 py-3 px-6 border-[1px]'],
  {
    defaultVariants: {
      position: 'bottom-left',
      type: 'success',
    },
    variants: {
      position: {
        ['bottom-left']: ['bottom-4 left-4'],
        ['bottom-right']: ['bottom-4 right-4'],
        ['center']: ['top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'],
        ['top-left']: ['top-4 left-4'],
        ['top-right']: ['top-4 right-4'],
      },
      type: {
        error: ['border-danger-500 bg-danger-900'],
        success: ['border-success-500 bg-success-900'],
      },
    },
  }
)

const Alert = (props: AlertProps) => {
  const { message, onClose, position, type } = props
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  return (
    <AlertDialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className={'fixed inset-0 bg-dark-500 opacity-40 data-[state=open]:animate-overlayShow'}
        />
        <AlertDialog.Content className={cn(AlertVariants({ position, type }))}>
          <AlertDialog.Description>
            {type === 'error' && (
              <Typography as={'span'} variant={'bold16'}>
                {`Error! `}
              </Typography>
            )}
            <Typography as={'span'} variant={'regular16'}>
              {message}
            </Typography>
          </AlertDialog.Description>
          <div>
            <AlertDialog.Cancel asChild>
              <IconButton onClick={handleClose}>
                <CloseOutline />
              </IconButton>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

Alert.displayName = 'Alert'

export { Alert, type AlertProps }
