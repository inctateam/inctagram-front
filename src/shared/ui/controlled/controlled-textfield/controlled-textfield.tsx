import { ChangeEvent } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, type TextFieldProps } from '@/shared/ui'

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  onBlur?: () => void
  shouldValidateOnChange?: boolean
} & Omit<TextFieldProps, 'id' | 'onChange' | 'value'> &
  UseControllerProps<TFieldValues>

export const ControlledTextField = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  onBlur,
  shouldUnregister,
  shouldValidateOnChange,
  ...textFieldProps
}: ControlledTextFieldProps<TFieldValues>) => {
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
    <TextField
      id={name}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      {...textFieldProps}
    />
  )
}
