import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination'

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
