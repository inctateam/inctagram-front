import type { Meta, StoryObj } from '@storybook/react'

import { MenuOutline } from '@/assets/icons'

import { ArrowIosBackOutline } from './outlined'

const meta = {
  component: ArrowIosBackOutline,
  tags: ['autodocs'],
  title: 'Iconography/ArrowIosBackOutline',
} satisfies Meta<typeof ArrowIosBackOutline>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowIosBackOutline1: Story = {}

export const SvgMenuOutline: Story = {
  render: () => <MenuOutline />,
}
