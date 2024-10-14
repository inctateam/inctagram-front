import { forwardRef, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Calendar, TextFieldPopover, TextFieldProps } from '@/shared/ui'
import { format } from 'date-fns'

export const DatePickerRange = forwardRef<HTMLInputElement, Omit<TextFieldProps, 'endIcon'>>(
  (props, ref) => {
    const [date, setDate] = useState<DateRange | undefined>(undefined)
    const [open, setOpen] = useState<boolean>(false)

    let dateDisplay = 'Pick a date'

    if (date?.from) {
      if (date.to) {
        dateDisplay = `${format(date.from, 'dd/LL/y')} - ${format(date.to, 'dd/LL/y')}`
      } else {
        dateDisplay = format(date.from, 'dd/LL/y')
      }
    }

    return (
      <TextFieldPopover open={open} setOpen={setOpen} value={dateDisplay} {...props} ref={ref}>
        <Calendar initialFocus mode={'range'} onSelect={setDate} selected={date} />
      </TextFieldPopover>
    )
  }
)
