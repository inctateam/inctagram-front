import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Calendar } from '@/shared/ui'

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
  render: () => {
    const [date, setDate] = useState<DateRange | undefined>(undefined)

    return (
      <Calendar
        className={'rounded-sm border border-dark-300'}
        mode={'range'}
        onSelect={setDate}
        selected={date}
      />
    )
  },
}
