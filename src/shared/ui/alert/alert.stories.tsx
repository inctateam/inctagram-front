import type { Meta, StoryObj } from '@storybook/react'

import { Toaster } from 'react-hot-toast'

import { Button } from '@/shared/ui'
import { Alert, showToast } from '@/shared/ui/alert/alert'

const meta = {
  component: Alert,
  tags: ['autodocs'],
  title: 'UI/Alert',
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'Your settings are saved',
    type: 'success',
  },
  render: ({ message, type }) => {
    const onClickHandler = () => {
      showToast({ message, type })
    }

    return (
      <div>
        <Button onClick={onClickHandler}>Show alert</Button>
        <Toaster position={'bottom-left'} />
      </div>
    )
  },
}

export const ErrorToast: Story = {
  args: {
    message: 'Server is not available',
    type: 'error',
  },
  render: ({ message, type }) => {
    const onClickHandler = () => {
      showToast({ message, type })
    }

    return (
      <div>
        <Button onClick={onClickHandler}>Show alert</Button>
        <Toaster position={'top-right'} />
      </div>
    )
  },
}
