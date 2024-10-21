import { ResetPassword } from '@/features/auth/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ResetPassword> = {
  component: ResetPassword,
  title: 'Auth/ResetPassword',
}

export default meta
type Story = StoryObj<typeof ResetPassword>

export const Default: Story = {}
