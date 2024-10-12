import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from '@/shared/ui'

const meta = {
  component: Textarea,
  tags: ['autodocs'],
  title: 'UI/Textarea',
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    helperText: 'Enter your message',
    label: 'Message',
    placeholder: 'Message text...',
  },
}

export const Error: Story = {
  args: {
    error: true,
    helperText: 'Error',
    label: 'Message',
    placeholder: 'Message text...',
    value: 'invalid text',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: 'More the 3 characters',
    label: 'Message',
    placeholder: 'Message text...',
  },
}

export const Focused: Story = {
  args: {
    autoFocus: true,
    helperText: 'Error',
    label: 'Message',
    placeholder: 'Message text...',
  },
}

export const ErrorFocused: Story = {
  args: {
    autoFocus: true,
    error: true,
    helperText: 'Error',
    label: 'Message',
    placeholder: 'Message text...',
  },
}

export const WithAutoresize: Story = {
  args: {
    autoResize: true,
    helperText: 'Enter your message',
    label: 'Message',
    placeholder: 'Message text...',
  },
}
