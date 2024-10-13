import { HTMLAttributes, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Calendar as CalendarIcon } from '@/assets/icons'
import { Button } from '@/shared/ui'
import { Calendar } from '@/shared/ui/calendar/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover/popover'
import { cn } from '@/shared/utils'
import { format } from 'date-fns'

export const DatePicker = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  let dateDisplay

  if (date?.from) {
    if (date.to) {
      dateDisplay = (
        <>
          {format(date.from, 'dd/LL/y')} - {format(date.to, 'dd/LL/y')}
        </>
      )
    } else {
      dateDisplay = format(date.from, 'dd/LL/y')
    }
  } else {
    dateDisplay = <span className={'text-light-900 font-normal'}>Pick a date</span>
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn('w-[300px] justify-between font-normal text-4 py-2 px-4')}
            id={'date'}
            variant={'outline'}
          >
            {dateDisplay}

            <CalendarIcon className={'h-6 w-6'} />
          </Button>
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
    </div>
  )
}
