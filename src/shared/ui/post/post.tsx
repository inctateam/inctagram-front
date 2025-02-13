'use client'

import { useState } from 'react'

import { PublicPostItem } from '@/features/home-page/types'
import { Avatar, Typography } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { formatDistanceToNow } from 'date-fns'

type Props = {
  item: PublicPostItem
  onClick?: () => void
}

const itemDescription =
  'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem100 lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem100 lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem100 lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem100 lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem100 lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem100 lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.'

export const Post = ({ item, onClick }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })
  const minNumberOfLetters = 88
  const maxNumberOfLetters = 250

  const descriptionToShow =
    isExpanded || itemDescription.length <= minNumberOfLetters
      ? itemDescription
      : itemDescription.substring(0, minNumberOfLetters) + '...'

  const descriptionToHid =
    !isExpanded || itemDescription.length <= maxNumberOfLetters
      ? itemDescription
      : itemDescription.substring(0, maxNumberOfLetters) + '..'

  return (
    <li className={'flex flex-col h-[390px]'}>
      <div className={'min-h-[120px] relative overflow-hidden cursor-pointer'}>
        <ImageContent itemImages={item.images} onClick={onClick} />
      </div>
      <div
        className={`pt-2 flex flex-col gap-1 bg-dark-700 /*overflow-hidden*/ transition-all duration-1000 ease-in-out
        ${isExpanded ? 'max-h-[270px]' : 'max-h-[120px]'}`}
      >
        <div className={'flex items-center gap-3'}>
          <Avatar alt={'avatar'} size={12} src={item.avatarOwner} />
          <h2 className={'text-[16px]'}>{item.userName}</h2>
        </div>
        <p className={'text-[12px] text-light-900'}>{timeAgo}</p>
        <Typography variant={'regular14'}>
          {isExpanded ? descriptionToHid : descriptionToShow}
          {itemDescription.length > minNumberOfLetters && (
            <button
              className={'text-blue-500 ml-2'}
              onClick={() => setIsExpanded(prev => !prev)}
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
