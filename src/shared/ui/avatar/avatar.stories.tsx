import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '@/shared/ui'

const meta = {
  argTypes: {
    onClick: { action: 'clicked' },
    size: {
      control: { type: 'radio' },
      options: [6, 9, 12, 48],
    },
  },
  component: Avatar,
  tags: ['autodocs'],
  title: 'UI/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultAvatar: Story = {
  args: {
    alt: 'Avatar',
    onClick: () => alert('click'),
    size: 48,
    src: 'https://i.pinimg.com/736x/15/93/81/1593816c2e185d084fad34504453e943.jpg',
  },
}

export const NoAvatar: Story = {
  args: {
    alt: 'No Avatar',
    onClick: () => alert('click'),
    size: 48,
  },
}
