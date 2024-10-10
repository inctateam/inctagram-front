import { forwardRef, useState } from 'react'

import { Eye, EyeOff } from '@/assets/icons'
import { IconButton, TextField, TextFieldProps } from '@/shared/ui'

type PasswordTextFieldOwnProps = {
  onVisibilityChange?: (visibility: boolean) => void
}

type PasswordTextFieldProps = Omit<TextFieldProps, 'endIcon' | 'type'> & PasswordTextFieldOwnProps

const PasswordTextField = forwardRef<HTMLInputElement, PasswordTextFieldProps>((props, ref) => {
  const { onVisibilityChange, ...restProps } = props

  const [showPassword, setShowPassword] = useState(false)

  const handleEndIconClick = () => {
    setShowPassword(state => {
      const newVisibilityState = !state

      onVisibilityChange?.(newVisibilityState)

      return newVisibilityState
    })
  }

  const endIcon = (
    <IconButton
      aria-label={'Toggle password visibility'}
      className={'p-1'}
      disabled={props.disabled}
      onClick={handleEndIconClick}
    >
      {showPassword ? <EyeOff /> : <Eye />}
    </IconButton>
  )

  return (
    <TextField
      endIcon={endIcon}
      type={showPassword ? 'text' : 'password'}
      {...restProps}
      ref={ref}
    />
  )
})

PasswordTextField.displayName = 'PasswordTextField'

export { PasswordTextField, type PasswordTextFieldProps }
