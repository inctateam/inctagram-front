import type { Meta, StoryObj } from '@storybook/react'

import { DatePicker } from '@/shared/ui'

const meta = {
  component: DatePicker,
  tags: ['autodocs'],
  title: 'UI/DatePicker',
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Pick a date',
  },
}
