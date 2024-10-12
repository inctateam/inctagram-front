import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import { useGenerateId } from '@/shared/hooks'
import { Label, Typography } from '@/shared/ui'
import { getInputBaseStyles } from '@/shared/ui/text-field/text-field/getInputBaseStyles'
import { cn } from '@/shared/utils'

type TextFieldOwnProps = {
  className?: string
  disabled?: boolean
  endIcon?: ReactNode
  error?: boolean
  helperText?: string
  hideRequiredIndicator?: true
  id?: string
  label?: string
  required?: boolean
  requiredIndicator?: ReactNode
  startIcon?: ReactNode
}

type TextFieldProps = Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldOwnProps> &
  TextFieldOwnProps

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    className,
    disabled,
    endIcon,
    error,
    helperText,
    hideRequiredIndicator = undefined,
    id: inputId,
    label,
    required,
    requiredIndicator,
    startIcon,
    ...restInputProps
  } = props

  const id = useGenerateId(inputId)

  const commonIconStyles = cn(
    'absolute flex top-1/2 -translate-y-1/2 text-2xl',
    disabled && 'text-dark-100'
  )

  const styles = {
    endIcon: cn(commonIconStyles, 'right-3'),
    helperText: cn('text-light-900', error && 'text-danger-500', disabled && 'text-dark-100'),
    input: cn(getInputBaseStyles(error), startIcon && 'pl-10', endIcon && 'pr-10', className),
    label: cn('text-light-900', disabled && 'text-dark-100'),
    startIcon: cn(commonIconStyles, 'left-3'),
  }

  const helperTextId = useGenerateId() + '-feedback'

  const RequiredIndicator =
    required && !hideRequiredIndicator && (requiredIndicator || defaultRequiredIndicator)

  return (
    <div className={'flex flex-col w-full'}>
      {label && (
        <>
          <Typography as={Label} className={styles.label} htmlFor={id} variant={'regular14'}>
            {label}
            {RequiredIndicator}
          </Typography>
        </>
      )}
      <div className={'relative w-full'}>
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        <input
          aria-describedby={helperText ? helperTextId : undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-required={required ? 'true' : undefined}
          className={styles.input}
          disabled={disabled}
          id={id}
          type={'text'}
          {...restInputProps}
          ref={ref}
        />
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </div>
      {helperText && (
        <Typography
          aria-live={helperText ? 'polite' : undefined}
          className={styles.helperText}
          id={helperText ? helperTextId : undefined}
          variant={'regular14'}
        >
          {helperText}
        </Typography>
      )}
    </div>
  )
})

const defaultRequiredIndicator = (
  <span aria-hidden={'true'} className={'text-danger-500'} role={'presentation'}>
    *
  </span>
)

TextField.displayName = 'TextField'

export { TextField, type TextFieldProps }
