import { ChangeEvent } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { PasswordTextField, type PasswordTextFieldProps } from '@/shared/ui'

export type ControlledPasswordTextFieldProps<TFieldValues extends FieldValues> = {
  onBlur?: () => void
  shouldValidateOnChange?: boolean
} & Omit<PasswordTextFieldProps, 'id' | 'onChange' | 'value'> &
  UseControllerProps<TFieldValues>

export const ControlledPasswordTextField = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  onBlur,
  shouldUnregister,
  shouldValidateOnChange,
  ...passwordTextFieldProps
}: ControlledPasswordTextFieldProps<TFieldValues>) => {
  const {
    field: { onBlur: fieldOnBlur, onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    shouldUnregister,
  })

  const handleBlur = () => {
    fieldOnBlur()
    onBlur?.()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    if (shouldValidateOnChange) {
      handleBlur()
    }
  }

  return (
    <PasswordTextField
      id={name}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      {...passwordTextFieldProps}
    />
  )
}
