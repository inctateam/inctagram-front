import { Pagination } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Pagination> = {
  argTypes: {
    initialItemsPerPage: {
      control: false,
    },
  },
  component: Pagination,
  title: 'UI/Pagination',
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    initialItemsPerPage: 10,
    totalItems: 550,
  },
}
