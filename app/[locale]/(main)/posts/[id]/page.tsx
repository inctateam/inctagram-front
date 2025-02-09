// export default function Posts({ params: { id } }: { params: { id: string } }) {
//   return <div>Post {id}</div>
// }
'use client'
import { useState } from 'react'

import { usePostCommentsQuery, usePostQuery } from '@/features/post-page/api'
import { PostModal } from '@/features/post-page/ui/post'

export default function Posts({ params: { id } }: { params: { id: string } }) {
  const [open, setOpen] = useState(true)
  const { data: post } = usePostQuery({ postId: Number(id) })
  const { data: comments } = usePostCommentsQuery({ postId: Number(id) })

  return (
    <div>
      <div
        className={'flex cursor-pointer border-2 border-dark-100'}
        onClick={() => setOpen(!open)}
      >
        Post {id}
      </div>
      <div className={'flex cursor-pointer border-2 border-dark-100'}>{`Open: ${open}`}</div>
      {open && post && (
        <PostModal
          comments={comments?.items || []}
          onOpenChange={() => setOpen(!open)}
          open={open}
          post={post}
        />
      )}
    </div>
  )
}
