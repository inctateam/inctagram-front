import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/shared/ui'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'UI/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const CheckboxDefault: Story = {
  args: {},
}
