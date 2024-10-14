import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { ArrowIosBackOutline, ArrowIosForwardOutline } from '@/assets/icons'
import { buttonVariants } from '@/shared/ui'
import { cn } from '@/shared/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn('px-6 py-4 bg-dark-500', className)}
      classNames={{
        caption: 'flex justify-between relative items-center',
        caption_label: 'text-base font-bold',
        cell: cn(
          'h-9 w-9 text-center text-base p-0 relative focus-within:relative focus-within:z-20',
          'last:text-danger-300 [&:nth-child(6)]:text-danger-300',
          '[&:has([aria-selected])]:bg-accent-900',
          props.mode === 'single' && '[&:has([aria-selected])]:rounded-full',
          props.mode === 'range' &&
            '[&:has([aria-selected].day-range-start)]:rounded-l-full [&:has([aria-selected].day-range-end)]:rounded-r-full'
        ),
        day: cn(
          'h-9 w-9 p-0 outline-0 rounded-full font-normal text-base',
          'hover:bg-accent-700',
          'focus-visible:border-2 focus-visible:border-accent-300'
        ),
        day_outside: 'day-outside text-light-900',
        day_range_end: 'day-range-end',
        day_range_middle: 'day-range-middle',
        day_range_start: 'day-range-start',
        day_today: 'text-accent-500',
        head_cell: 'text-light-900 w-9 font-normal my-3',
        head_row: 'flex h-10 items-center mb-1',
        month: 'space-y-4',
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        nav: 'flex space-x-1',
        nav_button: cn(
          buttonVariants({ variant: 'secondary' }),
          'h-9 w-9 p-0 border-0 rounded-full opacity-50 hover:opacity-100 '
        ),
        nav_button_next: '',
        nav_button_previous: '',
        row: 'flex w-full mt-2',
        table: 'w-full space-x-1',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ArrowIosBackOutline className={'h-4 w-4'} />,
        IconRight: () => <ArrowIosForwardOutline className={'h-4 w-4'} />,
      }}
      showOutsideDays
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
