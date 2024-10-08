import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import { useGenerateId } from '@/shared/hooks'
import { Label, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import { clsx } from 'clsx'

type TextFieldOwnProps = {
  className?: string
  disabled?: boolean
  endIcon?: ReactNode
  error?: boolean
  helperText?: string
  id?: string
  label?: string
  startIcon?: ReactNode
}

type TextFieldProps = ComponentPropsWithoutRef<'input'> & TextFieldOwnProps

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    className,
    disabled,
    endIcon,
    error,
    helperText,
    id: inputId,
    label,
    startIcon,
    ...restInputProps
  } = props

  const id = useGenerateId(inputId)

  const styles = {
    endIcon: clsx(
      'absolute flex top-1/2 translate-y-[-50%] text-2xl disabled:text-dark-100',
      'right-3'
    ),
    helperText: cn('text-light-900', error && 'text-danger-500', disabled && 'text-dark-100'),
    input: cn(
      'text-base font-normal text-light-100 placeholder:text-light-900 bg-transparent border border-solid border-dark-100 rounded-sm w-full px-3 py-1.5',
      startIcon && 'pl-10',
      endIcon && 'pr-10',
      error && 'border-danger-500',
      'hover:border-light-900',
      'active:border-accent-500',
      error && 'active:border-danger-500',
      'focus-visible:border-accent-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent-500',
      error && 'focus-visible:border-danger-500 focus-visible:outline-danger-500',
      'disabled:text-dark-100 disabled:border-dark-100 disabled:placeholder:text-dark-100',
      className
    ),
    label: cn('text-light-900', disabled && 'text-dark-100'),
    startIcon: clsx(
      'absolute flex top-1/2 translate-y-[-50%] text-2xl disabled:text-dark-100',
      'left-3'
    ),
  }

  return (
    <div className={'flex flex-col w-full'}>
      {label && (
        <Typography as={Label} className={styles.label} htmlFor={id} variant={'regular14'}>
          {label}
        </Typography>
      )}
      <div className={'relative'}>
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        <input
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
        <Typography className={styles.helperText} variant={'regular14'}>
          {helperText}
        </Typography>
      )}
    </div>
  )
})

TextField.displayName = 'TextField'

export { TextField, type TextFieldProps }
