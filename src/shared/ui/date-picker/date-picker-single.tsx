import { useState } from 'react'

import { Calendar, TextFieldProps } from '@/shared/ui'
import { TextFieldPopover } from '@/shared/ui/date-picker/text-field-popover'
import { format } from 'date-fns'

export const DatePickerSingle = ({ ...props }: Omit<TextFieldProps, 'endIcon'>) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  let dateDisplay = 'Pick a date'

  if (date) {
    dateDisplay = format(date, 'dd/LL/y')
  }

  return (
    <TextFieldPopover open={open} setOpen={setOpen} value={dateDisplay} {...props}>
      <Calendar initialFocus mode={'single'} onSelect={setDate} selected={date} />
    </TextFieldPopover>
  )
}
