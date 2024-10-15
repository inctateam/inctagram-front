import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Calendar } from '@/shared/ui'
import { format } from 'date-fns'

const meta = {
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Calendar',
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'range',
  },
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>()

    const handleDaySelect = (dateRange: DateRange | undefined) => {
      setDateRange(dateRange)
    }

    return (
      <>
        <div>
          From: {dateRange && dateRange.from ? format(dateRange.from, 'dd/LL/y') : 'not selected'}
        </div>
        <div>
          To: {dateRange && dateRange.to ? format(dateRange.to, 'dd/LL/y') : 'not selected'}
        </div>
        <Calendar
          className={'rounded-sm border border-dark-300'}
          mode={'range'}
          onSelect={handleDaySelect}
          selected={dateRange}
        />
      </>
    )
  },
}
