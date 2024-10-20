import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { DatePickerRange } from '@/shared/ui'
import { format } from 'date-fns'

const meta = {
  component: DatePickerRange,
  tags: ['autodocs'],
  title: 'UI/DatePicker/DatePickerRange',
} satisfies Meta<typeof DatePickerRange>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'name' },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'name',
  },
}

export const WithError: Story = {
  args: {
    error: true,
    helperText: 'Error',
    label: 'name',
  },
}

export const GetSelectedDateRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>()

    const handleDaySelect = (dateRange: DateRange | undefined) => {
      setDateRange(dateRange)
    }

    return (
      <div>
        <div>
          From: {dateRange && dateRange.from ? format(dateRange.from, 'dd/LL/y') : 'not selected'}
        </div>
        <div>
          To: {dateRange && dateRange.to ? format(dateRange.to, 'dd/LL/y') : 'not selected'}
        </div>
        <DatePickerRange date={dateRange} onDateSelect={handleDaySelect} />
      </div>
    )
  },
}
