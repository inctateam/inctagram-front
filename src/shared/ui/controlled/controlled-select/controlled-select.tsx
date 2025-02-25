import { ReactNode } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Select, SelectItem, SelectProps } from '@/shared/ui'

export type ControlledSelectProps<TFieldValues extends FieldValues, T = unknown> = {
  className?: string
  label?: ReactNode
  options: Array<{ label: string; value: string } & T>
} & Omit<SelectProps, 'onChange' | 'value'> &
  UseControllerProps<TFieldValues>

export const ControlledSelect = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  options,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    shouldUnregister,
  })

  return (
    <Select {...selectProps} onValueChange={onChange} value={value}>
      {options.map(option => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  )
}
