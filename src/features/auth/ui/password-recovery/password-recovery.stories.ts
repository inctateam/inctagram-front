import { PasswordRecoveryForm } from '@/features/auth/ui'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {},
  component: PasswordRecoveryForm,
  tags: ['autodocs'],
  title: 'Forms/Password Recovery Form',
} satisfies Meta<typeof PasswordRecoveryForm>

export default meta
type Story = StoryObj<typeof meta>

export const PasswordRecovery: Story = {
  args: {
    resendEmail: fn(),
    userEmail: 'example@epam.com',
  },
}
