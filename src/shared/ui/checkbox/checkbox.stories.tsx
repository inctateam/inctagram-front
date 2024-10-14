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

export const DefaultCheckbox: Story = {
  args: {
    label: 'Checkbox',
  },
}

export const CheckboxWithoutLabel: Story = {
  args: {},
}
export const CheckboxWithoutLabelChecked: Story = {
  args: {
    checked: true,
  },
}
export const CheckboxChecked: Story = {
  args: {
    checked: true,
    label: 'Checked checkbox',
  },
}

export const CheckboxUnchecked: Story = {
  args: {
    checked: false,
    label: 'Unchecked checkbox',
  },
}
export const CheckboxDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled checkbox',
  },
}
export const CheckboxDisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled checkbox',
  },
}
