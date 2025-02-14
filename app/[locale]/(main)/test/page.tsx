'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import { CreatePostDialog } from '@/features/post-page/ui/createPost/createPostDialog'
import { Button } from '@/shared/ui'

export default function Test() {
  const [open, setOpen] = useState<boolean>(false)

  const onPostPublished = () => {
    setOpen(false)
    toast.success('Post has been published successfully')
  }

  return (
    <div>
      <CreatePostDialog onOpenChange={setOpen} onPostPublished={onPostPublished} open={open} />
      <Button onClick={() => setOpen(true)} variant={'primary'}>
        Open Create post modal
      </Button>
    </div>
  )
}
