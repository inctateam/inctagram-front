import { ComponentPropsWithoutRef, ElementType } from 'react'

import { cn } from '@/shared/utils'
import { VariantProps, cva } from 'class-variance-authority'

type TypographyOwnProps<T extends ElementType> = {
  as?: T
}

type TypographyVariantsProps = VariantProps<typeof typographyVariants>

type TypographyProps<T extends ElementType = DefaultElement> = ComponentPropsWithoutRef<T> &
  TypographyOwnProps<T> &
  TypographyVariantsProps

const VariantTagMap = {
  bold14: 'p',
  bold16: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  large: 'div',
  medium14: 'p',
  regular14: 'p',
  regular16: 'p',
  semiSmall: 'span',
  small: 'span',
} as const

const defaultVariant = 'regular14'

type DefaultElement = (typeof VariantTagMap)[typeof defaultVariant]

const typographyVariants = cva('text-light-100 cursor-default', {
  defaultVariants: {
    variant: defaultVariant,
  },
  variants: {
    variant: {
      bold14: ['text-sm font-bold'],
      bold16: ['text-base font-bold'],
      h1: ['text-xl font-bold'],
      h2: ['text-lg font-bold'],
      h3: ['text-base font-semibold'],
      large: ['text-2.5xl font-semibold'],
      medium14: ['text-sm font-medium'],
      regular14: ['text-sm font-normal'],
      regular16: ['text-base font-normal'],
      semiSmall: ['text-xs font-semibold'],
      small: ['text-xs font-normal'],
    },
  },
})

const Typography = <T extends ElementType = DefaultElement>(props: TypographyProps<T>) => {
  const { as, className, variant, ...restProps } = props

  const Component = as || VariantTagMap[variant ? variant : defaultVariant]

  return <Component className={cn(typographyVariants({ className, variant }))} {...restProps} />
}

Typography.displayName = 'Typography'

export { Typography, type TypographyProps, typographyVariants }
