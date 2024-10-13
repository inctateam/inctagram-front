import { forwardRef, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Calendar as CalendarIcon } from '@/assets/icons'
import { TextField, TextFieldProps } from '@/shared/ui'
import { Calendar } from '@/shared/ui/calendar/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover/popover'
import { cn } from '@/shared/utils'
import { format } from 'date-fns'

type DatePickerProps = {} & Omit<TextFieldProps, 'endIcon' | 'value'>

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const { ...textFieldProps } = props
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  let dateDisplay

  if (date?.from) {
    if (date.to) {
      dateDisplay = `${format(date.from, 'dd/LL/y')} - ${format(date.to, 'dd/LL/y')}`
    } else {
      dateDisplay = format(date.from, 'dd/LL/y')
    }
  } else {
    dateDisplay = 'Pick a date'
  }

  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <TextField
          className={cn('text-start', open && 'bg-dark-300')}
          {...textFieldProps}
          endIcon={<CalendarIcon className={'h-6 w-6 group-disabled:text-light-100'} />}
          ref={ref}
          value={dateDisplay}
        />
      </PopoverTrigger>
      <PopoverContent align={'start'} className={'w-auto p-0'}>
        <Calendar
          defaultMonth={date?.from}
          initialFocus
          mode={'range'}
          numberOfMonths={1}
          onSelect={setDate}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  )
})
