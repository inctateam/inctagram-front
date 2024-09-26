import { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'UI/Tabs',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Tabs',
    value: 'Tabs',
  },
}

export const Active: Story = {
  args: {
    className: 'active',
    value: 'Tabs',
  },
}

export const Hover: Story = {
  args: {
    className: 'hover',
    value: 'Tabs',
  },
}

export const Focus: Story = {
  args: {
    className: 'focus',
    value: 'Tabs',
  },
}

export const Disabled: Story = {
  args: {
    className: 'disabled',
    value: 'Tabs',
  },
}
