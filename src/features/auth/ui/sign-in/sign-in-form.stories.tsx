import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { SignInForm } from './sign-in-form'

const meta = {
  component: SignInForm,
  parameters: {
    layout: 'centered',
  },
  title: 'Auth/Sign In Form',
} satisfies Meta<typeof SignInForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}
