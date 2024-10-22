import { ForgotPassword } from '@/features/auth/ui'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {},
  component: ForgotPassword,
  tags: ['autodocs'],
  title: 'Auth/Forgot Password',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordForm: Story = {
  args: {
    onSubmit: fn(),
  },
}
