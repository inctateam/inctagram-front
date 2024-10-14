import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerRange } from '@/shared/ui/date-picker/date-picker-range/date-picker-range'

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
