import { forwardRef, useState } from 'react'
import { OnSelectHandler, PropsSingle } from 'react-day-picker'

import { Calendar } from '@/shared/ui'
import { formatDateToString } from '@/shared/utils/formatingDate/formatStringDate'
import { format } from 'date-fns'

import { DatePickerPopover, DatePickerPopoverProps } from '../date-picker-popover'

type DatePickerSingleProps = {
  date?: PropsSingle['selected']
  onDateSelect?: PropsSingle['onSelect']
  otherDatePickerProps?: Omit<PropsSingle, 'mode' | 'onSelect' | 'selected'>
} & Omit<DatePickerPopoverProps, 'value'>

export const DatePickerSingle = forwardRef<HTMLInputElement, DatePickerSingleProps>(
  ({ date, defaultValue, onDateSelect, otherDatePickerProps, ...popoverTextFieldProps }, ref) => {
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

    let formattedDate = defaultValue
      ? formatDateToString(String(defaultValue), 'dd/LL/y')
      : 'Pick a date'

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
