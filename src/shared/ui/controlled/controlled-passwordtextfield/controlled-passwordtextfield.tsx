import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { PasswordTextField, type PasswordTextFieldProps } from '@/shared/ui'

export type ControlledPasswordTextFieldProps<TFieldValues extends FieldValues> = Omit<
  PasswordTextFieldProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const ControlledPasswordTextField = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...passwordTextFieldProps
}: ControlledPasswordTextFieldProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <PasswordTextField id={name} onChange={onChange} value={value} {...passwordTextFieldProps} />
  )
}
