import { forwardRef } from 'react'

import { SearchOutline } from '@/assets/icons'
import { TextField, TextFieldProps } from '@/shared/ui'

type SearchTextFieldProps = Omit<TextFieldProps, 'startIcon' | 'type'>

const SearchTextField = forwardRef<HTMLInputElement, SearchTextFieldProps>((props, ref) => {
  const startIcon = <SearchOutline className={'text-xl'} />

  return <TextField startIcon={startIcon} {...props} ref={ref} />
})

SearchTextField.displayName = 'SearchTextField'

export { SearchTextField, type SearchTextFieldProps }
