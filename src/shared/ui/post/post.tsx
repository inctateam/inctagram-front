'use client'

import { useState } from 'react'

import { PublicPostItem } from '@/features/home-page/types'
import { Avatar, ImageCarousel, Typography } from '@/shared/ui'
import { formatDistanceToNow } from 'date-fns'

type Props = {
  item: PublicPostItem
  onClick?: (open: boolean) => void
}

const itemDescription =
  'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem100 lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.'

export const Post = ({ item, onClick }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })

  const descriptionToShow =
    isExpanded || itemDescription.length <= 88
      ? itemDescription
      : itemDescription.substring(0, 88) + '...'

  const handleToggle = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <li className={'relative'}>
      <ImageCarousel images={item.images.map(image => image.url)} onClick={onClick} />
      <div
        className={`pt-2 flex flex-col gap-2 bg-dark-900 transition-all duration-300 ease-in-out absolute bottom-0 left-0 right-0 transform z-1
      ${isExpanded ? 'bottom-[-160px] max-h-none translate-y-0' : 'max-h-[160px] overflow-hidden translate-y-full'}`}
      >
        <div className={'flex items-center gap-3'}>
          <Avatar alt={'avatar'} size={12} src={item.avatarOwner} />
          <h2 className={'text-[16px]'}>{item.userName}</h2>
        </div>
        <p className={'text-[12px] text-light-900'}>{timeAgo}</p>
        <Typography variant={'regular14'}>
          {descriptionToShow}
          {itemDescription.length > 88 && (
            <button className={'text-blue-500 ml-2'} onClick={handleToggle} type={'button'}>
              <u>{isExpanded ? 'Hide' : 'Show more'}</u>
            </button>
          )}
        </Typography>
      </div>
    </li>
  )
}
