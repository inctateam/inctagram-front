import { Meta, StoryObj } from '@storybook/react'

import { PasswordResetForm } from './password-reset-form'

const meta: Meta<typeof PasswordResetForm> = {
  component: PasswordResetForm,
  parameters: {
    layout: 'centered',
  },
  title: 'Auth/PasswordResetForm',
}

export default meta
type Story = StoryObj<typeof PasswordResetForm>

export const Default: Story = {}
