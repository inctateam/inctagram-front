import React from 'react'

import { DialogHeader, Typography } from '@/shared/ui'

export const DialogHeaderTitle = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <DialogHeader {...props}>
      <Typography as={'h2'} variant={'h1'}>
        {children}
      </Typography>
    </DialogHeader>
  )
}
