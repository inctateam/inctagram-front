import type { Meta, StoryObj } from '@storybook/react'

import { toast } from 'react-toastify'

import { Button, ToastProvider } from '@/shared/ui'

const meta = {
  component: ToastProvider,
  tags: ['autodocs'],
  title: 'UI/Toast',
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  render: () => {
    return (
      <div>
        <ToastProvider />
        <Button onClick={() => toast.success('Success!')}>success toast</Button>
      </div>
    )
  },
}

export const Error: Story = {
  render: () => {
    return (
      <div>
        <ToastProvider />
        <Button onClick={() => toast.error('Error text!')}>success toast</Button>
      </div>
    )
  },
}
