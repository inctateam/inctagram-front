import * as React from 'react'

import { cn } from '@/shared/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogPrimitive.DialogTitle
    className={cn('px-6 py-3 border-b border-dark-100', className)}
    {...props}
  />
)

DialogHeader.displayName = 'DialogHeader'
