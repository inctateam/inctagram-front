import type { Meta, StoryObj } from '@storybook/react'

import { FormLabel } from '@/shared/ui'

const meta = {
  component: FormLabel,
  tags: ['autodocs'],
  title: 'UI/FormControl/FormLabel',
} satisfies Meta<typeof FormLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Form Label Text',
  },
}

export const Required: Story = {
  args: {
    children: 'Form Label Text',
    required: true,
  },
}

export const CustomRequiredIndicator: Story = {
  args: {
    children: 'Form Label Text',
    required: true,
    requiredIndicator: (
      <span className={'ml-1'}>
        (<span className={'text-danger-500'}>required</span>)
      </span>
    ),
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Form Label',
    disabled: true,
  },
}

export const Polymorphic: Story = {
  args: {
    asChild: true,
    children: <span>Form Label text</span>,
    required: true,
  },
}

export const CustomStyles: Story = {
  args: {
    children: 'Form Label Custom Styles',
    className: 'text-light-100 underline',
  },
}
