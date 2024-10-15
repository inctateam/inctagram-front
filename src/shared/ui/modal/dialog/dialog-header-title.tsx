import React from 'react'

import { Typography } from '@/shared/ui'
import { DialogHeader } from '@/shared/ui/modal/dialog/dialog-header'

export const DialogHeaderTitle = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <DialogHeader {...props}>
      <Typography as={'h2'} variant={'h1'}>
        {children}
      </Typography>
    </DialogHeader>
  )
}
