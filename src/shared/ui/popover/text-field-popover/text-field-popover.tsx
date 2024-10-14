import { forwardRef } from 'react'

import { Calendar as CalendarIcon } from '@/assets/icons'
import { TextField, TextFieldProps } from '@/shared/ui'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover/popover'
import { cn } from '@/shared/utils'

type DatePickerProps = {
  open: boolean
  setOpen: (open: boolean) => void
} & Omit<TextFieldProps, 'endIcon'>

export const TextFieldPopover = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const { children, className, error, open, setOpen, ...textFieldProps } = props

  return (
    <Popover onOpenChange={setOpen} open={open}>
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
