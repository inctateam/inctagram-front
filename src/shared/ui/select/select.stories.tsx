import { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

import { FlagRussia } from '@/assets/icons/components/other/FlagRussia'

const meta: Meta<typeof Select> = {
  args: {},
  component: Select,
  tags: ['autodocs'],
  title: 'UI/Select',
}

export default meta

type Story = StoryObj<typeof meta>

const options = [
  { children: 'English', label: 'English' },
  { children: 'French', label: 'French' },
  { children: 'Italian', label: 'Italian' },
  { children: 'Chineese', label: 'Chineese' },
  {
    children: (
      <div className={'flex justify-start items-center gap-2'}>
        <FlagRussia /> Russian
      </div>
    ),
    label: 'Russian',
  },
]

export const Default: Story = {
  args: {
    options,
    placeholder: 'Choose a language',
    title: 'Select-box',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options,
    placeholder: 'Choose a language',
    title: 'Select-box',
  },
}

export const Active: Story = {
  args: {
    open: true,
    options,
    placeholder: 'Choose a language',
    title: 'Select-box',
  },
}

export const Focus: Story = {
  args: {
    isFocused: true,
    open: false,
    options,
    placeholder: 'Choose a language',
    title: 'Select-box',
  },
}
