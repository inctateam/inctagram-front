import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/shared/utils'

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, ...restProps } = props

  return (
    <div
      className={cn(
        'w-[378px]  p-6',
        'bg-dark-500 text-light-100 border border-dark-300 rounded-sm',
        'flex flex-col items-center',
        className
      )}
      ref={ref}
      {...restProps}
    />
  )
})
