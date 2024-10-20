import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from './create-new-password'

const meta: Meta<typeof CreateNewPassword> = {
  component: CreateNewPassword,
  title: 'UI/CreateNewPassword',
}

export default meta
type Story = StoryObj<typeof CreateNewPassword>

export const Default: Story = {}
