import { ComponentPropsWithoutRef } from 'react'

import { typographyVariants } from '@/shared/ui'
import { cn } from '@/shared/utils'
import { Slot } from '@radix-ui/react-slot'

type FormHelperTextOwnProps = {
  asChild?: boolean
  disabled?: boolean
  error?: boolean
}

type FormHelperTextProps = ComponentPropsWithoutRef<typeof defaultElement> & FormHelperTextOwnProps

const defaultElement = 'p'

const FormHelperText = (props: FormHelperTextProps) => {
  const { asChild, className, disabled, error, ...passthroughProps } = props

  const Component = asChild ? Slot : defaultElement

  return (
    <Component
      aria-live={'polite'}
      className={cn(
        typographyVariants({ variant: 'regular14' }),
        'text-light-900',
        error && 'text-danger-500',
        disabled && 'text-dark-100',
        className
      )}
      {...passthroughProps}
    />
  )
}

FormHelperText.displayName = 'FormHelperText'

export { FormHelperText, type FormHelperTextProps }
