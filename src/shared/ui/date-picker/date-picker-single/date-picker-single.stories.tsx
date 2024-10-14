import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerSingle } from '@/shared/ui/date-picker/date-picker-single/date-picker-single'

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
