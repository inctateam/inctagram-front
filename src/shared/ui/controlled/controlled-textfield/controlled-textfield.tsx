import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, type TextFieldProps } from '@/shared/ui'

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const ControlledTextField = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  shouldUnregister,
  ...textFieldProps
}: ControlledTextFieldProps<TFieldValues>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    defaultValue,
    name,
    shouldUnregister,
  })

  return <TextField id={name} onChange={onChange} value={value} {...textFieldProps} {...field} />
}
