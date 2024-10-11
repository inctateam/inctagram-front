import { Tabs } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tabs> = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  args: {},
  component: Tabs,
  tags: ['autodocs'],
  title: 'UI/Tabs',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'Tabs',
  },
}

export const Active: Story = {
  args: {
    isActive: true,
    value: 'Tabs',
  },
}

export const Focus: Story = {
  args: {
    isFocused: true,
    value: 'Tabs',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Tabs',
  },
}
