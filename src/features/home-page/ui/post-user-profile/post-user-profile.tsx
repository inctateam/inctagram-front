import { useState } from 'react'

import { MeResponse } from '@/features/auth/types'
import { Post } from '@/features/home-page/ui/user-profile/types/user-profile.types'
import { PostModal } from '@/features/post-page/ui/post/post-modal'
import { ImageContent } from '@/shared/ui/image-content'

type Props = {
  me: MeResponse | undefined
  onDelete: (postId: number) => void // Функция для удаления поста
  post: Post
}

export const PostUserProfile = ({ me, onDelete, post }: Props) => {
  const [openPostId, setOpenPostId] = useState(false)
  const handleOpenPostModal = () => {
    setOpenPostId(prev => !prev)
  }
  const handleClosePostModal = () => {
    setOpenPostId(prev => !prev)
  }

  const handleDelete = () => {
    onDelete(post.id)
  }

  return (
    <>
      <div className={'min-h-[120px] cursor-pointer'}>
        <ImageContent
          itemImages={post.images.map(image => image['url'])}
          onClick={handleOpenPostModal}
          size={'small'}
        />
      </div>
      {openPostId && (
        <PostModal
          me={me}
          onDelete={handleDelete}
          onOpenChange={handleClosePostModal}
          open={openPostId}
          post={post}
        >
          <ImageContent itemImages={post.images.map(image => image.url)} />
        </PostModal>
      )}
    </>
  )
}
