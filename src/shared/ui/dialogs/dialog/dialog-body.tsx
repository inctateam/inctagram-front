import * as React from 'react'

import { cn } from '@/shared/utils'

export const DialogBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('w-full', className)} {...props} />
)

DialogBody.displayName = 'DialogBody'
