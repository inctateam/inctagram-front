import type { Meta, StoryObj } from '@storybook/react'

import { LogOutOutline, Person, Settings } from '@/assets/icons'
import { Dropdown } from '@/shared/ui'

const meta = {
  argTypes: {},
  component: Dropdown,
  tags: ['autodocs'],
  title: 'UI/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    icon: <Person />,
    label: 'My Profile',
    onClick: () => {
      console.log('My Profile clicked')
    },
  },
  {
    icon: <LogOutOutline />,
    label: 'Sign Out',
    onClick: () => {
      console.log('Sign Out clicked')
    },
  },
  {
    icon: <Settings />,
    label: 'Settings',
    onClick: () => {
      console.log('Settings clicked')
    },
  },
]

export const DefaultDropdown: Story = {
  args: {
    items: items,
  },
  render: args => (
    // Центрирование
    <div className={'flex items-center justify-center min-h-screen'}>
      <Dropdown {...args} />
    </div>
  ),
}
