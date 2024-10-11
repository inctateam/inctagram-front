import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'

type CardProps = {
  asChild?: boolean
} & ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariants>

const cardVariants = cva(
  ['w-full block', 'bg-dark-500 text-light-100 border border-dark-300 rounded-sm'],
  {
    defaultVariants: {
      variant: 'base',
    },
    variants: {
      variant: {
        auth: 'p-6 max-w-[378px]',
        base: '',
        devices: 'px-6 py-4',
        graph: 'pt-3 pb-2 px-6',
      },
    },
  }
)

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { asChild = false, className, variant, ...restProps } = props

  const Component = asChild ? Slot : 'div'

  return <Component className={cn(cardVariants({ className, variant }))} ref={ref} {...restProps} />
})
