import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from '@/shared/ui'

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
  },
  component: Radio,
  tags: ['autodocs'],
  title: 'UI/Radio',
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultRadio: Story = {
  args: {
    options: [
      { id: '1', label: 'Default', value: '1' },
      { id: '2', label: 'Feat', value: '2' },
      { id: '3', label: 'Refactor', value: '3' },
      { id: '4', label: 'Test', value: '4' },
    ],
  },
}
