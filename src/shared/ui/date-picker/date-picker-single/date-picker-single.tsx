import { MouseEvent, forwardRef, useState } from 'react'
import { ActiveModifiers, DayPickerSingleProps, SelectSingleEventHandler } from 'react-day-picker'

import { Calendar } from '@/shared/ui'
import { format } from 'date-fns'

import { DatePickerPopover, DatePickerPopoverProps } from '../date-picker-popover'

type DatePickerSingleProps = {
  date?: DayPickerSingleProps['selected']
  onDateSelect?: SelectSingleEventHandler
  otherDatePickerProps?: Omit<DayPickerSingleProps, 'mode' | 'onSelect' | 'selected'>
} & Omit<DatePickerPopoverProps, 'value'>

export const DatePickerSingle = forwardRef<HTMLInputElement, DatePickerSingleProps>(
  ({ date, onDateSelect, otherDatePickerProps, ...popoverTextFieldProps }, ref) => {
    const isControlled = date

    const [uncontrolledDate, setUncontrolledDate] = useState<Date>()

    const finalDate = isControlled ? date : uncontrolledDate

    const handleDaySelect: SelectSingleEventHandler = (
      date: Date | undefined,
      selectedDay: Date,
      activeModifiers: ActiveModifiers,
      e: MouseEvent
    ) => {
      onDateSelect?.(date, selectedDay, activeModifiers, e)
      setUncontrolledDate(date)
    }

    let formattedDate = 'Pick a date'

    if (finalDate) {
      formattedDate = format(finalDate, 'dd/LL/y')
    }

    return (
      <DatePickerPopover value={formattedDate} {...popoverTextFieldProps} ref={ref}>
        <Calendar
          initialFocus
          mode={'single'}
          onSelect={handleDaySelect}
          selected={finalDate}
          {...otherDatePickerProps}
        />
      </DatePickerPopover>
    )
  }
)
