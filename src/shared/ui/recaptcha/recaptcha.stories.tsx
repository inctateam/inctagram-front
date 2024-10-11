import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from '@/shared/ui'

const meta = {
  component: Recaptcha,
  tags: ['autodocs'],
  title: 'UI/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const DarkMode: Story = {
  args: {},
}

export const LightMode: Story = {
  args: {
    theme: 'light',
  },
}

export const TypeAudio: Story = {
  args: {
    type: 'audio',
  },
}
