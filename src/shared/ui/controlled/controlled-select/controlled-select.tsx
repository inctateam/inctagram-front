import { ReactNode } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Select, SelectItem, SelectProps } from '@/shared/ui'

export type ControlledSelectProps<TFieldValues extends FieldValues> = {
  className?: string
  label?: ReactNode
  options: Array<{ id: string; label: string; value: string } & Record<string, any>> | undefined
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

  console.log('value', value)

  return (
    <Select {...selectProps} onValueChange={onChange} value={value}>
      {options?.map((option, index) => (
        <SelectItem key={`${option.id}-${index}`} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  )
}
