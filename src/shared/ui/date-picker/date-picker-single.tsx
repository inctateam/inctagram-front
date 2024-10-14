import { forwardRef, useState } from 'react'

import { Calendar, TextFieldProps } from '@/shared/ui'
import { TextFieldPopover } from '@/shared/ui/date-picker/text-field-popover'
import { format } from 'date-fns'

export const DatePickerSingle = forwardRef<HTMLInputElement, Omit<TextFieldProps, 'endIcon'>>(
  (props, ref) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [open, setOpen] = useState<boolean>(false)

    let dateDisplay = 'Pick a date'

    if (date) {
      dateDisplay = format(date, 'dd/LL/y')
    }

    return (
      <TextFieldPopover open={open} setOpen={setOpen} value={dateDisplay} {...props} ref={ref}>
        <Calendar initialFocus mode={'single'} onSelect={setDate} selected={date} />
      </TextFieldPopover>
    )
  }
)
