import type { Meta, StoryObj } from '@storybook/react'

import { Comment } from '@/features/post-page/ui/comments/comment/comment'
import { MoakComments } from '@/features/post-page/ui/post/testObj'

const meta: Meta<typeof Comment> = {
  component: Comment,
  tags: ['autodocs'],
  title: 'PROFILE/POST/Comment',
} satisfies Meta<typeof Comment>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultComment: Story = {
  args: {
    ...MoakComments.items[1],
  },
}
