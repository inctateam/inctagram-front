import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { PostDialog } from '@/features/profile/post/PostDialog'
import { Button } from '@/shared/ui'

const meta: Meta<typeof PostDialog> = {
  component: PostDialog,
  tags: ['autodocs'],
  title: 'PROFILE/POST/PostDialog',
} satisfies Meta<typeof PostDialog>

export default meta

type Story = StoryObj<typeof meta>

export const PostDialogDefault: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Button With Callback</Button>
        <PostDialog onOpenChange={setOpen} open={open} />
      </>
    )
  },
}
