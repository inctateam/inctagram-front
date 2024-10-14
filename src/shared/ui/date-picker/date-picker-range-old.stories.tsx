import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerRangeOld } from '@/shared/ui'

const meta = {
  component: DatePickerRangeOld,
  tags: ['autodocs'],
  title: 'UI/DatePickerRangeOld',
} satisfies Meta<typeof DatePickerRangeOld>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Pick a date',
  },
}
