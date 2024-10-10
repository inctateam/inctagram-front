import type { Meta, StoryObj } from '@storybook/react'

import { PasswordTextField } from '@/shared/ui'

const meta = {
  component: PasswordTextField,
  tags: ['autodocs'],
  title: 'UI/TextField/PasswordTextField',
} satisfies Meta<typeof PasswordTextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    helperText: 'At least 8 characters',
    label: 'Password',
    placeholder: 'password',
  },
}

export const Error: Story = {
  args: {
    error: true,
    helperText: 'At least 8 characters',
    label: 'Password',
    placeholder: 'password',
    value: 'f7sdk',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: 'At least 8 characters',
    label: 'Password',
    placeholder: 'password',
  },
}
export const Focused: Story = {
  args: {
    autoFocus: true,
    helperText: 'At least 8 characters',
    label: 'Password',
    placeholder: 'password',
    value: 'f7sdk',
  },
}

export const ErrorFocused: Story = {
  args: {
    autoFocus: true,
    error: true,
    helperText: 'At least 8 characters',
    label: 'Password',
    placeholder: 'password',
    value: 'f7sdk',
  },
}
