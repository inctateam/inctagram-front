import { useState } from 'react'

import { PublicPostItem } from '@/features/home-page/types'
import { PostModal } from '@/features/post-page/ui/post/post-modal'
import { Avatar, Typography } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

type Props = {
  item: PublicPostItem
}
const MIN_LETTERS = 75
const MAX_LETTERS = 250

/*
const item.description =
  'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.'
*/

export const Post = ({ item }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [openPostId, setOpenPostId] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0) // Храним текущий индекс изображения
  const [itemImages, setItemImages] = useState(item.images) // Храним изображения

  const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })

  const handleChangeItemDescription = () => {
    setIsExpanded(prev => !prev)

    if (!isExpanded) {
      // Если разворачиваем описание — выбираем только текущее изображение
      setItemImages([item.images[selectedIndex]])
    } else {
      // Если скрываем описание — возвращаем весь массив
      setItemImages(item.images)
    }
  }
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

  const shortDescription =
    item.description.length <= MIN_LETTERS
      ? item.description
      : `${item.description.substring(0, MIN_LETTERS)}...`

  const longDescription =
    item.description.length <= MAX_LETTERS
      ? item.description
      : `${item.description.substring(0, MAX_LETTERS)}...`

  return (
    <li className={'flex flex-col max-h-[390px]'}>
      <div className={'min-h-[120px] h-[240px] cursor-pointer'}>
        <ImageContent
          itemImages={itemImages.map(image => image.url)}
          onClick={handleOpenPostModal}
          selectedIndexCallBack={setSelectedIndex}
        />
      </div>

      <div className={`pt-2 flex flex-col gap-1 bg-dark-700 ${isExpanded ? 'h-auto' : 'h-auto'}`}>
        <Link
          className={'flex items-center gap-3 cursor-pointer'}
          href={`/profile/${item.ownerId}`}
        >
          <Avatar alt={'avatar'} size={12} src={item.avatarOwner} />
          <h2 className={'text-[16px]'}>{item.userName}</h2>
        </Link>
        <p className={'text-[12px] text-light-900'}>{timeAgo}</p>
        <Typography variant={'regular14'}>
          {isExpanded ? longDescription : shortDescription}
          {item.description.length > MIN_LETTERS && (
            <button
              className={'text-blue-500 ml-2'}
              onClick={handleChangeItemDescription}
              type={'button'}
            >
              <u>{isExpanded ? 'Hide' : 'Show more'}</u>
            </button>
          )}
        </Typography>
      </div>
      {openPostId && (
        <PostModal onOpenChange={handleClosePostModal} open={openPostId} post={item}>
          <ImageContent itemImages={item.images.map(image => image.url)} />
        </PostModal>
      )}
    </li>
  )
}
