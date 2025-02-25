import { ReactNode } from 'react'

import { FormLabel } from '@/shared/ui'

import { SelectContent, SelectContentProps } from './select-content'
import { SelectRoot, SelectRootProps } from './select-root'
import { SelectTrigger } from './select-trigger'

type SelectOwnProps = {
  className?: string
  label?: ReactNode
  placeholder?: ReactNode
  selectContentProps?: SelectContentProps
}

export type SelectProps = SelectOwnProps & SelectRootProps

export const Select = ({ children, className, label, placeholder, ...restProps }: SelectProps) => {
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <SelectRoot {...restProps}>
        <SelectTrigger placeholder={placeholder} />
        <SelectContent className={className}>{children}</SelectContent>
      </SelectRoot>
    </>
  )
}
