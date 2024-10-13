import type { Meta, StoryObj } from '@storybook/react'

import { SearchTextField } from '@/shared/ui'

const meta = {
  component: SearchTextField,
  tags: ['autodocs'],
  title: 'UI/TextField/SearchTextField',
} satisfies Meta<typeof SearchTextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'User search',
    placeholder: 'Search...',
  },
}

export const Error: Story = {
  args: {
    error: true,
    helperText: 'At least 3 characters',
    label: 'User search',
    placeholder: 'Search...',
    value: 'ab',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'User search',
    placeholder: 'Search...',
  },
}
export const Focused: Story = {
  args: {
    autoFocus: true,
    label: 'User search',
    placeholder: 'Search...',
    value: 'ab',
  },
}

export const ErrorFocused: Story = {
  args: {
    autoFocus: true,
    error: true,
    helperText: 'At least 3 characters',
    label: 'User search',
    placeholder: 'Search...',
    value: 'ab',
  },
}
