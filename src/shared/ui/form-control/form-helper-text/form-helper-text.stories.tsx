import type { Meta, StoryObj } from '@storybook/react'

import { FormHelperText } from '@/shared/ui'

const meta = {
  component: FormHelperText,
  tags: ['autodocs'],
  title: 'UI/FormControl/FormHelperText',
} satisfies Meta<typeof FormHelperText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Form Helper Text',
  },
}

export const Error: Story = {
  args: {
    children: 'Error Helper Text',
    error: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Helper Text',
    disabled: true,
    error: true,
  },
}
