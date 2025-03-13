import { DayPicker, PropsBase, PropsRange, PropsSingle } from 'react-day-picker'

import { cn } from '@/shared/utils'

export type CalendarProps = PropsBase & (PropsRange | PropsSingle)

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn('px-6 py-4 bg-dark-500', className)}
      classNames={{
        // button_next:
        //   'flex items justify-center h-9 w-9 p-0 border-0 rounded-full bg-access-100 opacity-50 hover:opacity-100',
        button_next:
          'h-9 w-9 flex items-center justify-center bg-dark-100 rounded-full opacity-50 hover:opacity-100',
        button_previous:
          'h-9 w-9 flex items-center justify-center bg-dark-100 rounded-full opacity-50 hover:opacity-100',
        caption_label: cn(
          'inline-flex text-base font-bold',
          props.captionLayout === 'dropdown' && 'hidden'
        ),
        chevron: 'fill-light-100',
        day: cn(
          'h-9 w-9 text-center text-base p-0 relative focus-within:relative focus-within:z-20',
          'last:text-danger-300 [&:nth-child(6)]:text-danger-300'
        ),
        day_button: cn(
          'h-9 w-9 p-0 outline-0 rounded-full font-normal text-base',
          'hover:bg-accent-700',
          'focus-visible:border-2 focus-visible:border-accent-300'
        ),
        dropdown_root: 'inline-flex  bg-dark-500 text-light-100',
        dropdowns: 'inline-flex relative center bg-access-500 text-dark-100 gap-4',
        month: 'space-y-4',
        month_caption: 'flex justify-between items-center pl-2 pt-2',
        month_grid: 'w-full space-x-1',
        months: 'flex sm:flex-row relative space-y-4 sm:space-x-4 sm:space-y-0',
        months_dropdown: 'flex bg-dark-500 text-light-100 focus-visible:border-none',
        nav: 'nav flex absolute top-0 right-0',
        outside: 'day-outside text-light-900',
        range_end: 'rounded-r-full',
        range_middle: 'range-middle',
        range_start: 'rounded-l-full',
        selected: cn('bg-accent-900', props.mode === 'single' && 'rounded-full'),
        today: 'text-accent-500',
        week: 'flex w-full mt-2',
        weekday: 'text-light-900 w-9 font-normal my-3',
        weekdays: 'flex h-10 items-center mb-1',
        years_dropdown:
          'overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden bg-dark-500 text-light-100',
        ...classNames,
      }}
      // components={{
      //   NextMonthButton: () => <ArrowIosForwardOutline className={'h-4 w-4'} />,
      //   PreviousMonthButton: () => <ArrowIosBackOutline className={'h-4 w-4'} />,
      // }}
      showOutsideDays
      {...props}
    />
  )
}

// function Calendar({ className, classNames, ...props }: CalendarProps) {
//   // function Calendar({ className, ...props }: CalendarProps) {
//   return (
//     <DayPicker
//       className={cn('px-6 py-4 bg-dark-500', className)}
//       classNames={{
//         button_next: '',
//         button_previous: '',
//         caption_label: 'text-base font-bold',
//         day: cn(
//           'h-9 w-9 text-center text-base p-0 relative focus-within:relative focus-within:z-20',
//           'last:text-danger-300 [&:nth-child(6)]:text-danger-300',
//           '[&:has([aria-selected])]:bg-accent-900',
//           props.mode === 'single' && '[&:has([aria-selected])]:rounded-full',
//           props.mode === 'range' &&
//             '[&:has([aria-selected].range_start)]:rounded-l-full [&:has([aria-selected].range_end)]:rounded-r-full'
//         ),
//         day_button: cn(
//           'h-9 w-9 p-0 outline-0 rounded-full font-normal text-base',
//           'hover:bg-accent-700',
//           'focus-visible:border-2 focus-visible:border-accent-300'
//         ),
//         month: 'space-y-4',
//         month_caption: 'flex justify-between relative items-center',
//         month_grid: 'w-full space-x-1',
//         months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
//         // nav: 'flex space-x-1',
//         // nav_button: cn(
//         //   buttonVariants({ variant: 'secondary' }),
//         //   'h-9 w-9 p-0 border-0 rounded-full opacity-50 hover:opacity-100 '
//         // ),
//         nav: cn(
//           buttonVariants({ variant: 'secondary' }),
//           'flex space-x-1 h-9 w-9 p-0 border-0 rounded-full opacity-50 hover:opacity-100 '
//         ),
//         outside: 'day-outside text-light-900',
//         range_end: 'range-end',
//         range_middle: 'range-middle',
//         range_start: 'range-start',
//         today: 'text-accent-500',
//         week: 'flex w-full mt-2',
//         weekday: 'text-light-900 w-9 font-normal my-3',
//         weekdays: 'flex h-10 items-center mb-1',
//         ...classNames,
//       }}
//       components={{
//         NextMonthButton: () => <ArrowIosForwardOutline className={'h-4 w-4'} />,
//         PreviousMonthButton: () => <ArrowIosBackOutline className={'h-4 w-4'} />,
//       }}
//       showOutsideDays
//       {...props}
//     />
//   )
// }

Calendar.displayName = 'Calendar'

export { Calendar }
