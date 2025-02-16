import { useState } from 'react'

import { PublicPostItem } from '@/features/home-page/types'
import { Avatar, Typography } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { formatDistanceToNow } from 'date-fns'

type Props = {
  item: PublicPostItem
  onClick?: () => void
}

const MIN_LETTERS = 86
const MAX_LETTERS = 250
const itemDescription =
  'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.'

export const Post = ({ item, onClick }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
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
  const shortDescription =
    itemDescription.length <= MIN_LETTERS
      ? itemDescription
      : `${itemDescription.substring(0, MIN_LETTERS)}...`

  const longDescription =
    itemDescription.length <= MAX_LETTERS
      ? itemDescription
      : `${itemDescription.substring(0, MAX_LETTERS)}...`

  return (
    <li className={'flex flex-col h-[390px] overflow-hidden'}>
      <div
        className={`min-h-[120px] relative cursor-pointer transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[120px]' : 'max-h-[270px]'
        }`}
      >
        <ImageContent
          itemImages={itemImages}
          onClick={onClick}
          selectedIndexCallBack={setSelectedIndex}
        />
      </div>

      <div
        className={`pt-2 flex flex-col gap-1 bg-dark-700 transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[270px] h-full' : 'max-h-[120px]'
        }`}
      >
        <div className={'flex items-center gap-3'}>
          <Avatar alt={'avatar'} size={12} src={item.avatarOwner} />
          <h2 className={'text-[16px]'}>{item.userName}</h2>
        </div>
        <p className={'text-[12px] text-light-900'}>{timeAgo}</p>

        <Typography variant={'regular14'}>
          {isExpanded ? longDescription : shortDescription}
          {itemDescription.length > MIN_LETTERS && (
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
    </li>
  )
}
