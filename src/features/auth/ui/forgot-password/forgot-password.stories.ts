import { ForgotPassword } from '@/features/auth/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: ForgotPassword,
  tags: ['autodocs'],
  title: 'Forms/Forgot Password Form',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordForm: Story = {}
