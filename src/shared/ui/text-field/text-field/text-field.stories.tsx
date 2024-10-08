import type { Meta, StoryObj } from '@storybook/react'

import { CloseOutline, SearchOutline } from '@/assets/icons'
import { TextField } from '@/shared/ui'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'UI/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    helperText: 'More the 3 characters',
    label: 'Name',
    placeholder: 'Enter your name',
  },
}

export const Error: Story = {
  args: {
    error: true,
    helperText: 'Error',
    label: 'Name',
    placeholder: 'Enter your name',
    value: 'do',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: 'More the 3 characters',
    label: 'Name',
    placeholder: 'Enter your name',
  },
}

export const Focused: Story = {
  args: {
    autoFocus: true,
    helperText: 'Error',
    label: 'Name',
    placeholder: 'Enter your name',
  },
}

export const ErrorFocused: Story = {
  args: {
    autoFocus: true,
    error: true,
    helperText: 'Error',
    label: 'Name',
    placeholder: 'Enter your name',
  },
}

export const WithStartIcon: Story = {
  args: {
    helperText: 'More the 3 characters',
    label: 'Name',
    placeholder: 'Enter your name',
    startIcon: <SearchOutline />,
  },
}

export const WithEndIcon: Story = {
  args: {
    endIcon: <CloseOutline />,
    helperText: 'More the 3 characters',
    label: 'Name',
    placeholder: 'Enter your name',
  },
}
