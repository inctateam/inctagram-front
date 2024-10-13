import { Avatar } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Avatar> = {
  argTypes: {
    size: {
      control: {
        type: 'number',
      },
    },
  },
  component: Avatar,
  title: 'UI/Avatar',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: '192px',
  },
}
