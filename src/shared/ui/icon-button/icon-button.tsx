import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'

type IconButtonOwnProps = {
  asChild?: boolean
}

type IconButtonProps = ComponentPropsWithoutRef<'button'> &
  IconButtonOwnProps &
  NonNullable<VariantProps<typeof iconButtonVariants>>

const iconButtonVariants = cva(
  [
    'relative',
    'inline-flex items-center justify-center',
    'rounded-full',
    'select-none',
    'text-light-100',
  ],
  {
    compoundVariants: [
      {
        className: [
          'hover:bg-dark-300',
          'active:bg-dark-100',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500',
          'disabled:text-dark-100 disabled:bg-transparent',
          'transition',
        ],
        size: ['medium', 'small'],
      },
    ],
    defaultVariants: {
      size: 'medium',
    },
    variants: {
      size: {
        base: '',
        medium: 'text-2xl p-2',
        small: 'text-base p-1.5',
      },
    },
  }
)

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { asChild = false, children, className, size, ...restProps } = props

  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(iconButtonVariants({ className, size }))}
      type={Component === 'button' ? 'button' : undefined}
      {...restProps}
      ref={ref}
    >
      {children}
    </Component>
  )
})

IconButton.displayName = 'IconButton'

export { IconButton, type IconButtonProps, iconButtonVariants }
