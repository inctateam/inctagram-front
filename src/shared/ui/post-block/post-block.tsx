'use client'
import { useState } from 'react'

import { PublicPostItem, PublicPostsResponse } from '@/features/home-page/types'
import { PostModal } from '@/features/post-page/ui/post'
import { ImageContent } from '@/shared/ui/image-content'
import { Post } from '@/shared/ui/post'

type Props = {
  data: PublicPostsResponse
}

export const PostBlock = ({ data }: Props) => {
  const [openPostId, setOpenPostId] = useState<null | number>(null)

  return (
    <ul className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'}>
      {data.items.map((item: PublicPostItem) => (
        <div key={item.id}>
          <Post item={item} onClick={() => setOpenPostId(item.id)} />
          {openPostId === item.id && (
            <PostModal
              onOpenChange={() => setOpenPostId(null)}
              open={openPostId === item.id}
              post={item}
            >
              <ImageContent itemImages={item.images.map(image => image.url)} />
            </PostModal>
          )}
        </div>
      ))}
    </ul>
  )
}
