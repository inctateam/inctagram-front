import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { DatePickerSingle } from '@/shared/ui/'
import { format } from 'date-fns'

const meta = {
  component: DatePickerSingle,
  tags: ['autodocs'],
  title: 'UI/DatePicker/DatePickerSingle',
} satisfies Meta<typeof DatePickerSingle>

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

export const GetSelectedDate: Story = {
  render: () => {
    const [day, setDay] = useState<Date>()

    const handleDaySelect = (day: Date | undefined) => {
      setDay(day)
    }

    return (
      <div>
        <div>Day: {day ? format(day, 'dd/LL/y') : 'not selected'}</div>
        <DatePickerSingle date={day} onDateSelect={handleDaySelect} />
      </div>
    )
  },
}
