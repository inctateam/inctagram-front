import { ChangeEvent } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Textarea, TextareaProps } from '@/shared/ui'

export type ControlledTextAreaProps<TFieldValues extends FieldValues> = {
  onBlur?: () => void
  shouldValidateOnChange?: boolean
} & Omit<TextareaProps, 'id' | 'onChange' | 'value'> &
  UseControllerProps<TFieldValues>

export const ControlledTextarea = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  onBlur,
  shouldUnregister,
  shouldValidateOnChange,
  ...textAreaProps
}: ControlledTextAreaProps<TFieldValues>) => {
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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e)
    if (shouldValidateOnChange) {
      handleBlur()
    }
  }

  return (
    <Textarea
      id={name}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      {...textAreaProps}
    />
  )
}
