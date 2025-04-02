import { useState } from 'react'

import { Post } from '@/features/home-page/ui/user-profile/types/user-profile.types'
import { PostModal } from '@/features/post-page/ui/post/post-modal'
import { ImageContent } from '@/shared/ui/image-content'

type Props = {
  onDelete: (postId: number) => void // Функция для удаления поста
  post: Post
}

export const PostUserProfile = ({ onDelete, post }: Props) => {
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

  const handleDelete = () => {
    onDelete(post.id) // Вызываем удаление поста
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
