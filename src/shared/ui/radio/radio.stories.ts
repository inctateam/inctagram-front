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
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' },
      { id: '4', label: 'Option 4', value: '4' },
    ],
  },
}

export const RadioWithDefaultOption: Story = {
  args: {
    options: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { defaultValue: true, id: '3', label: 'Option 3', value: '3' },
      { id: '4', label: 'Option 4', value: '4' },
    ],
  },
}

export const RadioWithDisabledOptions: Story = {
  args: {
    options: [
      { disabled: true, id: '1', label: 'Option 1', value: '1' },
      { defaultValue: true, id: '2', label: 'Option 2', value: '2' },
      { disabled: true, id: '3', label: 'Option 3', value: '3' },
      { id: '4', label: 'Option 4', value: '4' },
    ],
  },
}
