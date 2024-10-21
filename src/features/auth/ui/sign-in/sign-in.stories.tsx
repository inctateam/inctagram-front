import { SignIn } from '@/features/auth/ui'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: SignIn,
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}
