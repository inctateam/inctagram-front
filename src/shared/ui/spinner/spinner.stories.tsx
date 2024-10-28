import { Spinner } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Spinner,
  tags: ['autodocs'],
  title: 'UI/Spinner',
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
}
