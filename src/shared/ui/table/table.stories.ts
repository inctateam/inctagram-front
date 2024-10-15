import { Table } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'UI/Table',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
