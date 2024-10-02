import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cn } from '@/shared/utils'
import Link from 'next/link'

export type TextProps<T extends ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
  href?: string
  variant:
    | 'bold_text_14'
    | 'bold_text_16'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'medium_text_14'
    | 'regular_link'
    | 'regular_text_14'
    | 'regular_text_16'
    | 'semi_bold_small_text'
    | 'small_link'
    | 'small_text'
}

export const Typography = <T extends ElementType>({
  as,
  className,
  href,
  variant,
  ...restProps
}: Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>> & TextProps<T>) => {
  let Component = as || 'p'

  if (variant === 'h1') {
    Component = 'h1'
  } else if (variant === 'h2') {
    Component = 'h2'
  } else if (variant === 'h3') {
    Component = 'h3'
  } else if (variant === 'small_link' || variant === 'regular_link') {
    Component = 'Link'
  }

  if (Component === 'Link' && href) {
    return (
      <Link
        className={cn(
          'text-accent-500 hover:underline',
          variant === 'regular_link' && 'text-[14px] leading-[24px]',
          variant === 'small_link' && 'text-[12px] leading-[16px]',
          className
        )}
        href={href}
        {...restProps}
      />
    )
  } else {
    return (
      <Component
        className={cn(
          variant === 'bold_text_14' && 'text-[14px] font-bold leading-[24px]',
          variant === 'bold_text_16' && 'text-[16px] font-bold leading-[24px]',
          variant === 'h1' && 'text-[20px] font-bold leading-[36px]',
          variant === 'h2' && 'text-[18px] font-bold leading-[24px]',
          variant === 'h3' && 'text-[16px] font-semibold leading-[24px]',
          variant === 'large' && 'text-[26px] font-semibold leading-[36px]',
          variant === 'medium_text_14' && 'text-[14px] font-medium leading-[24px]',
          variant === 'regular_text_14' && 'text-[14px] leading-[24px]',
          variant === 'regular_text_16' && 'text-[16px] leading-[24px]',
          variant === 'semi_bold_small_text' && 'text-[12px] font-semibold leading-[16px]',
          variant === 'small_text' && 'text-[12px] leading-[16px]',
          className
        )}
        {...restProps}
      />
    )
  }
}
