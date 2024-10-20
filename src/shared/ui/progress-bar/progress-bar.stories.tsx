import { ProgressBar } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: ProgressBar,
  title: 'UI/ProgressBar',
} satisfies Meta<typeof ProgressBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
