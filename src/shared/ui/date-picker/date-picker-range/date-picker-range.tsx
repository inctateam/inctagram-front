import { forwardRef, useState } from 'react'
import { DateRange, OnSelectHandler, PropsRange } from 'react-day-picker'

import { Calendar, TextFieldProps } from '@/shared/ui'
import { format } from 'date-fns'

import { DatePickerPopover, DatePickerPopoverProps } from '../date-picker-popover'

type DatePickerRangeProps = {
  date?: PropsRange['selected']
  onDateSelect?: PropsRange['onSelect']
  otherDatePickerProps?: Omit<PropsRange, 'mode' | 'onSelect' | 'selected'>
} & Omit<DatePickerPopoverProps, 'value'>

export const DatePickerRange = forwardRef<
  HTMLInputElement,
  DatePickerRangeProps & Omit<TextFieldProps, 'endIcon'>
>(({ date, onDateSelect, otherDatePickerProps, ...popoverTextFieldProps }, ref) => {
  const isControlled = date

  const [uncontrolledDate, setUncontrolledDate] = useState<DateRange>()

  const finalDate = isControlled ? date : uncontrolledDate

  const handleDaySelect: OnSelectHandler<DateRange | undefined> = (
    range,
    selectedDay,
    activeModifiers,
    e
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
        autoFocus
        mode={'range'}
        onSelect={handleDaySelect}
        selected={finalDate}
        {...otherDatePickerProps}
      />
    </DatePickerPopover>
  )
})
