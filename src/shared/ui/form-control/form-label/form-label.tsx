import { ReactNode } from 'react'

import { Label, LabelProps, typographyVariants } from '@/shared/ui'
import { cn } from '@/shared/utils'
import { Slottable } from '@radix-ui/react-slot'

type FormLabelOwnProps = {
  children?: ReactNode
  disabled?: boolean
  hideRequiredIndicator?: true
  required?: boolean
  requiredIndicator?: ReactNode
}

type FormLabelProps = FormLabelOwnProps & LabelProps

const FormLabel = (props: FormLabelProps) => {
  const {
    children,
    className,
    disabled,
    hideRequiredIndicator,
    required,
    requiredIndicator,
    ...restProps
  } = props

  const showRequiredIndicator = required && !hideRequiredIndicator
  const RequiredIndicator = showRequiredIndicator && (requiredIndicator || defaultRequiredIndicator)

  return (
    <Label
      className={cn(
        typographyVariants({ variant: 'regular14' }),
        'text-light-900',
        disabled && 'text-dark-100',
        className
      )}
      {...restProps}
    >
      <Slottable>{children}</Slottable>
      {RequiredIndicator}
    </Label>
  )
}

const defaultRequiredIndicator = (
  <span aria-hidden={'true'} className={'text-danger-500'} role={'presentation'}>
    *
  </span>
)

FormLabel.displayName = 'FormLabel'

export { FormLabel, type FormLabelProps }
