import { MouseEvent, forwardRef, useState } from 'react'
import {
  ActiveModifiers,
  DateRange,
  DayPickerRangeProps,
  SelectRangeEventHandler,
} from 'react-day-picker'

import { Calendar, TextFieldProps } from '@/shared/ui'
import { format } from 'date-fns'

import { DatePickerPopover, DatePickerPopoverProps } from '../date-picker-popover'

type DatePickerRangeProps = {
  date?: DayPickerRangeProps['selected']
  onDateSelect?: SelectRangeEventHandler
  otherDatePickerProps?: Omit<DayPickerRangeProps, 'mode' | 'onSelect' | 'selected'>
} & Omit<DatePickerPopoverProps, 'value'>

export const DatePickerRange = forwardRef<
  HTMLInputElement,
  DatePickerRangeProps & Omit<TextFieldProps, 'endIcon'>
>(({ date, onDateSelect, otherDatePickerProps, ...popoverTextFieldProps }, ref) => {
  const isControlled = date

  const [uncontrolledDate, setUncontrolledDate] = useState<DateRange>()

  const finalDate = isControlled ? date : uncontrolledDate

  const handleDaySelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
    selectedDay: Date,
    activeModifiers: ActiveModifiers,
    e: MouseEvent
  ) => {
    onDateSelect?.(range, selectedDay, activeModifiers, e)
    setUncontrolledDate(range)
  }

  let formattedDate = 'Pick a date'

  if (finalDate && finalDate?.from) {
    if (finalDate.to) {
      formattedDate = `${format(finalDate.from, 'dd/LL/y')} - ${format(finalDate.to, 'dd/LL/y')}`
    } else {
      formattedDate = format(finalDate.from, 'dd/LL/y')
    }
  }

  return (
    <DatePickerPopover value={formattedDate} {...popoverTextFieldProps} ref={ref}>
      <Calendar
        initialFocus
        mode={'range'}
        onSelect={handleDaySelect}
        selected={finalDate}
        {...otherDatePickerProps}
      />
    </DatePickerPopover>
  )
})
