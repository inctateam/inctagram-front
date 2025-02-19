'use client'
import { toast } from 'react-toastify'

import CopyOutline from '@/assets/icons/components/filled-outlined-pairs/CopyOutline'
import PersonAdd from '@/assets/icons/components/filled-outlined-pairs/PersonAdd'
import PersonRemove from '@/assets/icons/components/filled-outlined-pairs/PersonRemove'
import TrashOutline from '@/assets/icons/components/filled-outlined-pairs/TrashOutline'
import { useMeQuery } from '@/features/auth/api'
import { usePublicPostsByIdQuery, usePublicPostsByUserIdQuery } from '@/features/home-page/api'
import { Avatar, Dropdown, ProgressBar, Spinner } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { PostBlock } from '@/shared/ui/post-block'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import noData from '../../../../../public/images/no-data.svg'

type Props = {
  postId: number
  userId: number
}

export const PostsPage = ({ postId, userId }: Props) => {
  const { data: me } = useMeQuery()
  const {
    data: post,
    error: errorPost,
    isLoading: isLoadingPost,
  } = usePublicPostsByIdQuery({ postId })
  const {
    data: posts,
    error: errorPosts,
    isLoading: isLoadingPosts,
  } = usePublicPostsByUserIdQuery({ userId })

  // Обработка ошибок и загрузки
  if (errorPost || errorPosts) {
    toast.error('Error loading posts')

    return null
  }
  if (isLoadingPost) {
    return <ProgressBar />
  }
  if (isLoadingPosts) {
    return <Spinner fullScreen />
  }
  // Если нет данных
  if (!post || !posts) {
    return (
      <div className={'max-w-[972px] mx-auto flex justify-center items-center'}>
        <Image alt={'No data'} src={noData} />
      </div>
    )
  }
  const dropRemove = [
    {
      icon: <PersonRemove />,
      label: 'Unfollow',
    },
    {
      icon: <TrashOutline />,
      label: 'Delete post',
    },
  ]
  const dropAdd = [
    {
      icon: <PersonAdd />,
      label: 'Follow',
    },
    {
      icon: <CopyOutline />,
      label: 'Copy Link',
    },
  ]
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
  const dropDownItems = me?.userId === post?.ownerId ? dropAdd : dropRemove

  return (
    <div className={'max-w-[972px] mx-auto mb-6 flex flex-col justify-center items-center'}>
      <div className={'max-w-[490px]'}>
        <div className={'flex justify-between items-center'}>
          <div className={'flex justify-start items-center gap-2'}>
            <Link
              className={'flex items-center gap-3 cursor-pointer'}
              href={`/profile/${post.ownerId}`}
            >
              <Avatar alt={'avatar'} size={12} src={post.avatarOwner} />
              <h2 className={'text-[16px]'}>{post.userName}</h2>
            </Link>
            <div className={'h-1 w-1 rounded-full bg-light-100'}></div>
            <p className={'text-[12px] text-light-900'}>{timeAgo}</p>
          </div>
          {me?.userId && <Dropdown className={'bg-dark-500'} items={dropDownItems} />}
        </div>
        <div className={'my-3'}>
          <ImageContent itemImages={post.images.map(image => image.url)} />
        </div>
      </div>
      <PostBlock data={posts} />
    </div>
  )
}
