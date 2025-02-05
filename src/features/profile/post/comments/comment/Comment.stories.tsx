import type { Meta, StoryObj } from '@storybook/react'

import { Comment } from '@/features/profile/post/comments/comment/Comment'
import { MoakComments } from '@/features/profile/post/moakObj'

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
