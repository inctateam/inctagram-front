'use client'

import { useState } from 'react'

import { CreatePostDialog } from '@/features/post-page/ui/createPost/createPostDialog'
import { Button } from '@/shared/ui'

export default function Test() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
      <CreatePostDialog onOpenChange={setOpen} open={open} />
      <Button onClick={() => setOpen(true)} variant={'primary'}>
        Open Create post modal
      </Button>
    </div>
  )
}
