import * as React from 'react'

import { cn } from '@/shared/utils'

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-6 py-3 border-b border-dark-100', className)} {...props} />
)

DialogHeader.displayName = 'DialogHeader'
