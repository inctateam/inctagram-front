import { ReactNode } from 'react'

import { SelectContent } from './select-content'
import { SelectItem } from './select-item'
import { SelectRoot } from './select-root'
import { SelectTrigger } from './select-trigger'

interface SelectProps {
  className?: string
  disabled?: boolean
  isFocused?: boolean
  open?: boolean
  options: { children: ReactNode; label: string }[]
  placeholder?: string
  title: string
}
export const Select = ({
  className,
  disabled,
  isFocused,
  open,
  options,
  placeholder,
  title,
  ...props
}: SelectProps) => {
  return (
    <SelectRoot className={className} title={title} {...props} disabled={disabled} open={open}>
      <SelectTrigger
        className={className}
        disabled={disabled}
        isFocused={isFocused}
        placeholder={placeholder}
      />
      <SelectContent>
        {options.map(({ children, label }) => (
          <SelectItem key={label} value={label}>
            {children}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}
