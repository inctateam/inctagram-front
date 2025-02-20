'use client'
import { toast } from 'react-toastify'

import BookmarkOutline from '@/assets/icons/components/filled-outlined-pairs/BookmarkOutline'
import CopyOutline from '@/assets/icons/components/filled-outlined-pairs/CopyOutline'
import HeartOutline from '@/assets/icons/components/filled-outlined-pairs/HeartOutline'
import MessageCircleOutline from '@/assets/icons/components/filled-outlined-pairs/MessageCircleOutline'
import PersonAdd from '@/assets/icons/components/filled-outlined-pairs/PersonAdd'
import PersonRemove from '@/assets/icons/components/filled-outlined-pairs/PersonRemove'
import TrashOutline from '@/assets/icons/components/filled-outlined-pairs/TrashOutline'
import PaperPlaneOutline from '@/assets/icons/components/outlined/PaperPlaneOutline'
import { useMeQuery } from '@/features/auth/api'
import { usePublicPostsByIdQuery, usePublicPostsByUserIdQuery } from '@/features/home-page/api'
import { Avatar, Button, Dropdown, ProgressBar, Spinner, Typography } from '@/shared/ui'
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
      <div className={'max-w-[490px] mb-9'}>
        <div className={'flex justify-between items-center'}>
          <div className={'flex justify-start items-center gap-2'}>
            <Link className={'flex items-center gap-3'} href={`/profile/${post.ownerId}`}>
              <Avatar alt={'avatar'} size={9} src={post.avatarOwner} />
              <Typography className={'cursor-pointer'} variant={'h2'}>
                {post.userName}
              </Typography>
            </Link>
            <div className={'h-1 w-1 rounded-full bg-light-100'}></div>
            <p className={'text-[12px] text-light-900'}>{timeAgo}</p>
          </div>
          {me?.userId && <Dropdown className={'bg-dark-500'} items={dropDownItems} />}
        </div>
        <div className={'my-3'}>
          <ImageContent itemImages={post.images.map(image => image.url)} />
        </div>
        <div className={'flex justify-between items-center'}>
          <div className={'flex justify-start items-center gap-5'}>
            <HeartOutline height={'24px'} width={'24px'} />
            <MessageCircleOutline height={'24px'} width={'24px'} />
            <PaperPlaneOutline height={'24px'} width={'24px'} />
          </div>
          <BookmarkOutline height={'24px'} width={'24px'} />
        </div>
        <div className={'flex items-start gap-3 my-4'}>
          <Link href={`/profile/${post.ownerId}`}>
            <Avatar alt={'avatar'} size={9} src={post.avatarOwner} />
          </Link>
          <p>
            <Typography className={'inline mr-1'} variant={'h3'}>
              {post.userName}
            </Typography>
            <Typography className={'inline'} variant={'regular14'}>
              {post.description}
            </Typography>
          </p>
        </div>
        <div className={'flex items-center gap-3 mb-6'}>
          <ul className={'relative flex h-6'}>
            {post.avatarWhoLikes.slice(0, 10).map((avatar, index) => (
              <li className={'relative'} key={index}>
                <Avatar
                  alt={'AvaLik'}
                  className={`transform -translate-x-${index * 2} translate-y-1`} // смещение с каждым новым элементом
                  size={6}
                  src={avatar}
                />
              </li>
            ))}
          </ul>
          <Button className={'p-0'} variant={'text'}>
            <Typography className={'cursor-pointer'} variant={'regular14'}>
              {post.likesCount} <b>&quot;Like&quot;</b>
            </Typography>
          </Button>
        </div>
        <Button className={'p-0'} variant={'text'}>
          <Typography className={'text-light-900 cursor-pointer'} variant={'bold14'}>
            View All Comments (114)
          </Typography>
        </Button>
      </div>
      <PostBlock data={posts} />
    </div>
  )
}
