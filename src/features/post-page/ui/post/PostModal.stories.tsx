import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { PostModal } from '@/features/post-page/ui/post/postModal'
import { Button } from '@/shared/ui'

const meta: Meta<typeof PostModal> = {
  component: PostModal,
  tags: ['autodocs'],
  title: 'PROFILE/POST/PostDialog',
} satisfies Meta<typeof PostModal>

export default meta

type Story = StoryObj<typeof meta>

export const PostDialogDefault: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Button With Callback</Button>
        <PostModal onOpenChange={setOpen} open={open} />
      </>
    )
  },
}
