import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'

type ButtonOwnProps = {
  asChild?: boolean
  endIcon?: ReactNode
  startIcon?: ReactNode
}

type ButtonProps = ButtonOwnProps &
  ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants>

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-sm',
    'px-6 py-1.5',
    'text-base font-600',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-700',
    'transition',
  ],
  {
    defaultVariants: {
      size: 'medium',
      variant: 'primary',
    },
    variants: {
      size: {
        large: 'h-12',
        medium: 'h-9',
      },
      variant: {
        outline: [
          'text-accent-500 border-current border border-solid',
          'hover:border-accent-100 hover:text-accent-100',
          'active:border-accent-700 active:text-accent-700',
          'focus-visible:border-0',
          'disabled:border-accent-900 disabled:text-accent-900',
        ],
        primary: [
          'text-light-100 bg-accent-500',
          'hover:bg-accent-100',
          'active:bg-accent-700 active:text-light-500',
          'disabled:text-light-900 disabled:bg-accent-900',
        ],
        secondary: [
          'text-light-100 bg-dark-300',
          'hover:bg-dark-100',
          'active:bg-dark-400',
          'focus-visible:outline-accent-300',
          'disabled:text-light-900 disabled:bg-dark-500',
        ],
        text: [
          'text-accent-500',
          'hover:text-accent-100',
          'active:text-accent-700',
          'disabled:text-accent-900',
        ],
      },
    },
  }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    asChild = false,
    children,
    className,
    endIcon,
    size,
    startIcon,
    variant,
    ...restProps
  } = props

  const Component = asChild ? Slot : 'button'

  const iconCommonStyles = 'text-[24px]'

  const startIconElement = startIcon && (
    <span className={cn(iconCommonStyles, 'mr-3 -ml-1')}>{startIcon}</span>
  )

  const endIconElement = endIcon && (
    <span className={cn(iconCommonStyles, 'ml-3 -mr-1')}>{endIcon}</span>
  )

  return (
    <Component
      className={cn(buttonVariants({ className, size, variant }))}
      type={Component === 'button' ? 'button' : undefined}
      {...restProps}
      ref={ref}
    >
      {startIconElement}
      <Slottable>{children}</Slottable>
      {endIconElement}
    </Component>
  )
})

Button.displayName = 'Button'

export { Button, type ButtonProps, buttonVariants }
