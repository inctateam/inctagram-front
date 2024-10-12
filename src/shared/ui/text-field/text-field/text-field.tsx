import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import { useGenerateId } from '@/shared/hooks'
import { FormHelperText, FormLabel } from '@/shared/ui'
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
  label?: ReactNode
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
    hideRequiredIndicator,
    id: propInputId,
    label,
    required,
    requiredIndicator,
    startIcon,
    ...restInputProps
  } = props

  const finalInputId = useGenerateId(propInputId)
  const helperTextId = useGenerateId() + '-feedback'

  const commonIconStyles = cn(
    'absolute flex top-1/2 -translate-y-1/2 text-2xl',
    disabled && 'text-dark-100'
  )

  const styles = {
    endIcon: cn(commonIconStyles, 'right-3'),
    helperText: cn('text-light-900', error && 'text-danger-500', disabled && 'text-dark-100'),
    input: cn(getInputBaseStyles(error), startIcon && 'pl-10', endIcon && 'pr-10', className),
    startIcon: cn(commonIconStyles, 'left-3'),
  }

  return (
    <div className={'flex flex-col w-full'}>
      {label && (
        <FormLabel
          disabled={disabled}
          hideRequiredIndicator={hideRequiredIndicator}
          htmlFor={finalInputId}
          required={required}
          requiredIndicator={requiredIndicator}
        >
          {label}
        </FormLabel>
      )}
      <div className={'relative w-full'}>
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        <input
          aria-describedby={helperText ? helperTextId : undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-required={required ? 'true' : undefined}
          className={styles.input}
          disabled={disabled}
          id={finalInputId}
          type={'text'}
          {...restInputProps}
          ref={ref}
        />
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </div>
      {helperText && (
        <FormHelperText disabled={disabled} error={error} id={helperTextId}>
          {helperText}
        </FormHelperText>
      )}
    </div>
  )
})

TextField.displayName = 'TextField'

export { TextField, type TextFieldProps }
