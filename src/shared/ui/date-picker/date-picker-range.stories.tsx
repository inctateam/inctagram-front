import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerRange } from '@/shared/ui/date-picker/date-picker-range'

const meta = {
  component: DatePickerRange,
  tags: ['autodocs'],
  title: 'UI/DatePickerBaseSingle',
} satisfies Meta<typeof DatePickerRange>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
