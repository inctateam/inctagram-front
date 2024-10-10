import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'

type TextLinkOwnProps = {
  asChild?: ReactNode
}

type TextLinkProps = ComponentPropsWithoutRef<typeof Link> &
  TextLinkOwnProps &
  VariantProps<typeof textLinkVariants>

const textLinkVariants = cva(['inline-flex items-center justify-center'], {
  defaultVariants: {
    color: 'primary',
    size: 'medium',
    underline: true,
  },
  variants: {
    color: {
      primary: 'text-accent-500',
      regular: 'text-light-100',
    },
    size: {
      medium: 'text-sm',
      small: 'text-xs',
    },
    underline: {
      false: 'no-underline',
      true: 'underline',
    },
  },
})

const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>((props, ref) => {
  const { asChild = false, className, color, size, underline, ...restProps } = props

  const Component = asChild ? Slot : Link

  return (
    <Component
      className={cn(textLinkVariants({ className, color, size, underline }))}
      {...restProps}
      ref={ref}
    />
  )
})

TextLink.displayName = 'TextLink'

export { TextLink }
