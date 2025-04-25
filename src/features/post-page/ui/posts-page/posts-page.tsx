'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import BookmarkOutline from '@/assets/icons/components/filled-outlined-pairs/BookmarkOutline'
import CopyOutline from '@/assets/icons/components/filled-outlined-pairs/CopyOutline'
import PersonAdd from '@/assets/icons/components/filled-outlined-pairs/PersonAdd'
import PersonRemove from '@/assets/icons/components/filled-outlined-pairs/PersonRemove'
import TrashOutline from '@/assets/icons/components/filled-outlined-pairs/TrashOutline'
import { useMeQuery } from '@/features/auth/api'
import { usePublicPostCommentsQuery, usePublicPostsByIdQuery } from '@/features/home-page/api'
import {
  useGetPublicPostsByUserIdQuery,
  useLazyGetPublicPostsByUserIdQuery,
} from '@/features/home-page/ui/user-profile/api/user-profile.api'
import {
  usePostCommentsQuery,
  usePostLikesQuery,
  useUploadPostLikeStatusMutation,
} from '@/features/post-page/api'
import { InteractionButtons } from '@/features/post-page/ui/interactionBlock/interactionButtonst'
import { PostModal } from '@/features/post-page/ui/post/post-modal'
import { Avatar, Button, Dropdown, ProgressBar, Spinner, Textarea, Typography } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { PostBlock } from '@/shared/ui/post-block'
import { ScrollArea } from '@/shared/ui/scrollbar'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import noData from '../../../../../public/images/no-data.svg'

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
const POSTS_PER_PAGE = 8
const LAZY_POSTS_PER_PAGE = 9

type Props = {
  postId: number
  userId: number
}

export const PostsPage = ({ postId, userId }: Props) => {
  const [openPostId, setOpenPostId] = useState(false)
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
  } = useGetPublicPostsByUserIdQuery({
    pageSize: POSTS_PER_PAGE,
    userId,
  })
  const { data: postLikes } = usePostLikesQuery({ postId })
  const [statusLiked, setStatusLiked] = useState<boolean | undefined>(undefined)
  const { data: publicComments } = usePublicPostCommentsQuery({ postId: postId })
  const { data: privateComments } = usePostCommentsQuery({ postId: postId })
  const comments = me ? privateComments : publicComments
  const [trigger, { isFetching: isFetchingMore }] = useLazyGetPublicPostsByUserIdQuery()
  const [uploadPostLikeStatus] = useUploadPostLikeStatusMutation()
  const viewportRef = useRef<HTMLDivElement>(null)
  const loadMorePosts = useCallback(() => {
    if (
      posts &&
      posts.items.length > 0 &&
      posts.totalCount > posts.items.length &&
      !isFetchingMore
    ) {
      const lastPost = posts.items[posts.items.length - 1]

      trigger({
        endCursorPostId: lastPost.id,
        pageSize: LAZY_POSTS_PER_PAGE,
        userId,
      })
    }
  }, [posts, isFetchingMore, trigger, userId])

  useEffect(() => {
    setStatusLiked(postLikes?.items.some(user => user.userId === userId))
    const handleScroll = () => {
      const viewport = viewportRef.current

      if (viewport) {
        const { clientHeight, scrollHeight, scrollTop } = viewport

        if (scrollTop + clientHeight >= scrollHeight - 10) {
          loadMorePosts()
        }
      }
    }

    const viewport = viewportRef.current

    if (viewport) {
      viewport.addEventListener('scroll', handleScroll)

      return () => {
        viewport.removeEventListener('scroll', handleScroll)
      }
    }
  }, [posts, isFetchingMore, viewportRef, trigger, loadMorePosts, postLikes?.items, userId])

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

  if (!post || !posts) {
    return (
      <div className={'max-w-[972px] mx-auto flex justify-center items-center'}>
        <Image alt={'No data'} src={noData} />
      </div>
    )
  }
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
  const dropDownItems = me?.userId === post?.ownerId ? dropAdd : dropRemove
  const handleActionPostsPage = () => {}
  const handlerTogglePostLike = async () => {
    try {
      await uploadPostLikeStatus({ postId }).unwrap()
      setStatusLiked(prev => !prev)
    } catch {
      toast.error('The post has not been found')
    }
  }

  const handleOpenClosePostModal = () => {
    setOpenPostId(prev => !prev)
  }

  return (
    <ScrollArea className={'h-[91vh] max-w-[972px] mx-auto'} viewportRef={viewportRef}>
      <div className={'mb-6 flex flex-col items-center mr-2'}>
        <div className={'max-w-[490px] mb-9 border-b border-dark-100'}>
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
            {me?.userId && (
              <Dropdown
                className={'bg-dark-500'}
                items={dropDownItems}
                onClick={handleActionPostsPage}
              />
            )}
          </div>
          <div className={'my-3'}>
            <ImageContent itemImages={post.images.map(image => image.url)} />
          </div>
          <div className={'flex justify-between items-center'}>
            <div className={'flex justify-start items-center gap-5'}>
              {me?.userId && (
                <InteractionButtons isLiked={statusLiked} togglePostLike={handlerTogglePostLike} />
              )}
            </div>
            <BookmarkOutline height={'24px'} width={'24px'} />
          </div>
          <div className={'flex items-start gap-3 my-3'}>
            <Link href={`/profile/${post.ownerId}`}>
              <Avatar alt={'avatar'} size={9} src={post.avatarOwner} />
            </Link>
            <p>
              <Typography as={'span'} className={'text-sm font-bold inline mr-1'}>
                {post.userName}
              </Typography>
              <Typography as={'span'} className={'inline'} variant={'regular14'}>
                {post.description}
              </Typography>
            </p>
          </div>
          <div className={'flex items-center gap-3 mb-2'}>
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
            <Button className={'p-0'} type={'button'} variant={'text'}>
              <Typography className={'cursor-pointer'} variant={'regular14'}>
                {post.likesCount} <b>&quot;Like&quot;</b>
              </Typography>
            </Button>
          </div>
          <Button
            className={'p-0 text-light-900 text-sm font-bold'}
            onClick={handleOpenClosePostModal}
            variant={'text'}
          >
            View All Comments ({comments?.items.length})
          </Button>
          <form className={'flex justify-between items-start'}>
            <Textarea
              autoResize
              className={'border-none px-0 py-1'}
              placeholder={'Add a Comment...'}
            />
            <Button className={'p-0'} type={'submit'} variant={'text'}>
              Publish
            </Button>
          </form>
        </div>
        <PostBlock data={posts} me={me} />
      </div>
      <PostModal me={me} onOpenChange={handleOpenClosePostModal} open={openPostId} post={post}>
        <ImageContent itemImages={post.images.map(image => image.url)} />
      </PostModal>
    </ScrollArea>
  )
}
