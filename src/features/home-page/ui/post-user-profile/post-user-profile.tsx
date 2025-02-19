import { useState } from 'react'

import { Post } from '@/features/home-page/ui/user-profile/types/user-profile.types'
import { PostModal } from '@/features/post-page/ui/post'
import { ImageContent } from '@/shared/ui/image-content'

type Props = {
  post: Post
}

export const PostUserProfile = ({ post }: Props) => {
  const [openPostId, setOpenPostId] = useState(false)
  const handleOpenPostModal = () => {
    /*    if (!isExpanded) {
          // Если разворачиваем описание — выбираем только текущее изображение
          setItemImages([item.images[selectedIndex]])
        } else {
          // Если скрываем описание — возвращаем весь массив
          setItemImages(item.images)
        }*/
    setOpenPostId(prev => !prev)
  }
  const handleClosePostModal = () => {
    /*    if (!isExpanded) {
          // Если разворачиваем описание — выбираем только текущее изображение
          setItemImages([item.images[selectedIndex]])
        } else {
          // Если скрываем описание — возвращаем весь массив
          setItemImages(item.images)
        }*/
    setOpenPostId(prev => !prev)
  }

  return (
    <>
      <div className={'min-h-[120px] cursor-pointer'}>
        <ImageContent
          itemImages={post.images.map(image => image['url'])}
          onClick={handleOpenPostModal}
        />
      </div>
      {openPostId && (
        <PostModal onOpenChange={handleClosePostModal} open={openPostId} post={post}>
          <ImageContent itemImages={post.images.map(image => image.url)} />
        </PostModal>
      )}
    </>
  )
}
