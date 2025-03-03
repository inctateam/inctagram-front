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
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500',
  ],
  {
    compoundVariants: [
      {
        className: [
          'hover:bg-dark-300',
          'active:bg-dark-100',
          'disabled:text-dark-100 disabled:bg-transparent',
          'transition',
        ],
        color: 'default',
        size: ['medium', 'small', 'xs'],
      },
      {
        className: [
          'hover:bg-accent-900 hover:bg-opacity-25',
          'active:bg-accent-900 active:bg-opacity-40',
          'disabled:text-accent-900 disabled:bg-transparent',
          'transition',
        ],
        color: 'primary',
        size: ['medium', 'small', 'xs'],
      },
    ],
    defaultVariants: {
      color: 'default',
      size: 'medium',
    },
    variants: {
      color: {
        carousel:
          'text-light-100 bg-dark-500/20 hover:bg-dark-500/40 active:bg-dark-500/60 disabled:text-light-900 disabled:bg-transparent transition',
        cropper: 'rounded-none bg-dark-500 opacity-80 hover:opacity-100',
        default: 'text-light-100',
        primary: 'text-accent-500',
      },
      size: {
        default: '',
        medium: 'text-2xl p-1.5',
        small: 'text-base p-1.5',
        xs: 'text-xs p-0',
      },
    },
  }
)

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { asChild = false, children, className, color, size, ...restProps } = props

  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(iconButtonVariants({ className, color, size }))}
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
