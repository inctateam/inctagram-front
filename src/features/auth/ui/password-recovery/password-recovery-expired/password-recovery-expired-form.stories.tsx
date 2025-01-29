import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { PasswordRecoveryFormExpired } from './password-recovery-expired'

const meta = {
  component: PasswordRecoveryFormExpired,
  parameters: {
    layout: 'centered',
  },
  title: 'Auth/Password Recovery Form Expired',
} satisfies Meta<typeof PasswordRecoveryFormExpired>

export default meta
type Story = StoryObj<typeof meta>

export const PasswordRecovery: Story = {
  args: {
    resendEmail: fn(),
    userEmail: 'example@epam.com',
  },
}
