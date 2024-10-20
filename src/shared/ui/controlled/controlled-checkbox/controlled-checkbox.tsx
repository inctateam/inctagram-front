import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, type CheckboxProps } from '@/shared/ui'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> = Omit<
  CheckboxProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  shouldUnregister,
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

  return <Checkbox checked={value} id={name} onCheckedChange={onChange} {...checkboxProps} />
}
