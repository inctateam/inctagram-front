import { forwardRef, useState } from 'react'
import { DayPicker, OnSelectHandler, PropsSingle } from 'react-day-picker'

import { Calendar } from '@/shared/ui'
import { format } from 'date-fns'

import { DatePickerPopover, DatePickerPopoverProps } from '../date-picker-popover'

type DatePickerSingleProps = {
  date?: PropsSingle['selected']
  onDateSelect?: PropsSingle['onSelect']
  otherDatePickerProps?: Omit<PropsSingle, 'mode' | 'onSelect' | 'selected'>
} & Omit<DatePickerPopoverProps, 'value'>

export const DatePickerSingle = forwardRef<HTMLInputElement, DatePickerSingleProps>(
  ({ date, onDateSelect, otherDatePickerProps, ...popoverTextFieldProps }, ref) => {
    const isControlled = date

    const [uncontrolledDate, setUncontrolledDate] = useState<Date>()

    const finalDate = isControlled ? date : uncontrolledDate

    const handleDaySelect: OnSelectHandler<Date | undefined> = (
      date,
      selectedDay,
      activeModifiers,
      e
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
          captionLayout={'dropdown'}
          hideNavigation
          mode={'single'}
          onSelect={handleDaySelect}
          selected={finalDate}
          {...otherDatePickerProps}
        />
      </DatePickerPopover>
    )
  }
)
