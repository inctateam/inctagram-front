import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import { Slot } from '@radix-ui/react-slot'

type CardProps = {
  asChild?: boolean
} & ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { asChild = false, className, ...restProps } = props

  const Component = asChild ? Slot : 'div'

  return (
    <Component
      className={cn(
        'w-full p-6 block',
        'bg-dark-500 text-light-100 border border-dark-300 rounded-sm',
        // 'flex flex-col items-center',
        className
      )}
      ref={ref}
      {...restProps}
    />
  )
})
