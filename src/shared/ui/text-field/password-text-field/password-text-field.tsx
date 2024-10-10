import { forwardRef, useState } from 'react'

import { Eye, EyeOff } from '@/assets/icons'
import { IconButton, TextField, TextFieldProps } from '@/shared/ui'

type PasswordTextFieldOwnProps = {
  onVisibilityChange?: () => void
}

type PasswordTextFieldProps = Omit<TextFieldProps, 'endIcon' | 'type'> & PasswordTextFieldOwnProps

const PasswordTextField = forwardRef<HTMLInputElement, PasswordTextFieldProps>((props, ref) => {
  const { onVisibilityChange, ...restProps } = props

  const [showPassword, setShowPassword] = useState(false)

  const handleEndIconClick = () => {
    setShowPassword(state => !state)

    onVisibilityChange?.()
  }

  const endIcon = (
    <IconButton
      aria-label={'Toggle password visibility'}
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
