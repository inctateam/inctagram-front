import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/shared/ui'

const meta: Meta<typeof Checkbox> = {
  argTypes: {
    checked: { type: 'boolean' },
    disabled: { type: 'boolean' },
    label: { type: 'string' },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'UI/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
}

export const WithoutLabel: Story = {}

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked checkbox',
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Unchecked checkbox',
  },
}
export const UncheckedDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled checkbox',
  },
}
export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled checkbox',
  },
}
