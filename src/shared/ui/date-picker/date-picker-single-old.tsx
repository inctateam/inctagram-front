import { forwardRef, useState } from 'react'

import { Calendar as CalendarIcon } from '@/assets/icons'
import { TextField, TextFieldProps } from '@/shared/ui'
import { Calendar } from '@/shared/ui/calendar/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover/popover'
import { cn } from '@/shared/utils'
import { format } from 'date-fns'

type DatePickerProps = {} & Omit<TextFieldProps, 'endIcon' | 'value'>

export const DatePickerSingleOld = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const { className, error, ...textFieldProps } = props
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  let dateDisplay = 'Pick a date'

  if (date) {
    dateDisplay = format(date, 'dd/LL/y')
  }

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
          placeholder={'Pick a date'}
          {...textFieldProps}
          endIcon={<CalendarIcon className={cn('h-6 w-6', error && 'text-danger-500')} />}
          ref={ref}
          value={dateDisplay}
        />
      </PopoverTrigger>
      <PopoverContent align={'start'}>
        <Calendar
          initialFocus
          mode={'single'}
          numberOfMonths={1}
          onSelect={setDate}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  )
})

// <IconButton aria-label={'Close'}>
// <CloseOutline />
// </IconButton>
