import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, type CheckboxProps } from '@/shared/ui'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> = {
  onBlur?: () => void
  shouldValidateOnChange?: boolean
} & Omit<CheckboxProps, 'id' | 'onChange' | 'value'> &
  UseControllerProps<TFieldValues>

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  onBlur,
  shouldUnregister,
  shouldValidateOnChange,
  ...checkboxProps
}: ControlledCheckboxProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    shouldUnregister,
  })

  const handleChange = (checked: boolean) => {
    onChange(checked)
    if (shouldValidateOnChange) {
      onBlur?.()
    }
  }

  return <Checkbox checked={value} id={name} onCheckedChange={handleChange} {...checkboxProps} />
}
