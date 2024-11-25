import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { PasswordRecoveryForm } from './password-recovery-form'

const meta = {
  component: PasswordRecoveryForm,
  parameters: {
    layout: 'centered',
  },
  title: 'Auth/Password Recovery Form',
} satisfies Meta<typeof PasswordRecoveryForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modalOpen: false,
    onSubmit: fn(),
    setModalOpen: fn(),
    userEmail: 'example@gmail.com',
  },
}
