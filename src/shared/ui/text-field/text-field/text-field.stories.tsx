import type { Meta, StoryObj } from '@storybook/react'

import { CloseOutline, SearchOutline } from '@/assets/icons'
import { TextField } from '@/shared/ui'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'UI/TextField/TextField',
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

export const Required: Story = {
  args: {
    helperText: 'More the 3 characters',
    label: 'Name',
    placeholder: 'Enter your name',
    required: true,
  },
}

export const CustomRequiredIndicator: Story = {
  args: {
    helperText: 'More the 3 characters',
    label: 'Name',
    placeholder: 'Enter your name',
    required: true,
    requiredIndicator: (
      <span className={'ml-1'}>
        (<span className={'text-danger-500'}>required</span>)
      </span>
    ),
  },
}

export const RequiredWithHiddenIndicator: Story = {
  args: {
    helperText: 'More the 3 characters',
    hideRequiredIndicator: true,
    label: 'Name',
    placeholder: 'Enter your name',
    required: true,
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
    endIcon: <CloseOutline />,
    helperText: 'More the 3 characters',
    label: 'Name',
    placeholder: 'Enter your name',
    startIcon: <SearchOutline />,
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
    startIcon: <SearchOutline className={'size-5'} />,
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
