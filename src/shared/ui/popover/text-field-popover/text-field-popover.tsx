import { forwardRef } from 'react'

import { Calendar as CalendarIcon } from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger, TextField, TextFieldProps } from '@/shared/ui'
import { cn } from '@/shared/utils'

type DatePickerProps = {
  onOpenChange: (open: boolean) => void
  open: boolean
} & Omit<TextFieldProps, 'endIcon'>

export const TextFieldPopover = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const { children, className, error, onOpenChange, open, ...textFieldProps } = props

  return (
    <Popover onOpenChange={onOpenChange} open={open}>
      <PopoverTrigger asChild>
        <TextField
          className={cn(
            'text-start',
            open && 'bg-dark-300',
            error && 'text-danger-500 border-danger-500',
            className
          )}
          {...textFieldProps}
          endIcon={<CalendarIcon className={cn('h-6 w-6', error && 'text-danger-500')} />}
          error={error}
          ref={ref}
        />
      </PopoverTrigger>
      <PopoverContent align={'start'}>{children}</PopoverContent>
    </Popover>
  )
})
