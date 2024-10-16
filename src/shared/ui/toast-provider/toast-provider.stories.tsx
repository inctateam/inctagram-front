import type { Meta, StoryObj } from '@storybook/react'

import { toast } from 'react-toastify'

import { Button, ToastProvider } from '@/shared/ui'

const meta = {
  component: ToastProvider,
  decorators: [
    Story => (
      <>
        <ToastProvider />
        <Story />
      </>
    ),
  ],
  tags: ['autodocs'],
  title: 'UI/Toast',
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  render: () => {
    return (
      <div>
        <Button onClick={() => toast.success('Success!')}>success toast</Button>
      </div>
    )
  },
}

export const Error: Story = {
  render: () => {
    return (
      <div>
        <Button onClick={() => toast.error('Error text')}>error toast</Button>
      </div>
    )
  },
}
