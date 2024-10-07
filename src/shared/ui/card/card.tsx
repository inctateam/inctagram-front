import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'

type CardProps = { asChild?: boolean } & ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariants>

const cardVariants = cva(['block'], {
  compoundVariants: [
    {
      class: ['bg-dark-500 text-light-100 border border-dark-300 rounded-sm'],
      variant: ['auth', 'graph', 'devices'],
    },
  ],
  variants: {
    variant: {
      auth: ['max-w-[378px] mx-auto p-6 flex flex-col items-center'],
      devices: ['px-6 py-4 w-full flex flex-row justify-between'],
      graph: ['pt-3 pb-2 px-6 w-full'],
    },
  },
})

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { asChild = false, className, variant, ...restProps } = props

  const Component = asChild ? Slot : 'div'

  return <Component className={cn(cardVariants({ variant }), className)} ref={ref} {...restProps} />
})
