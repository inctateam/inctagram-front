'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { useMeQuery } from '@/features/auth/api'
import { usePublicPostsByIdQuery } from '@/features/home-page/api'
import Publication from '@/features/home-page/ui/home-page/publication/publication'
import {
  useGetPublicPostsByUserIdQuery,
  useLazyGetPublicPostsByUserIdQuery,
} from '@/features/home-page/ui/user-profile/api/user-profile.api'
import { usePostLikesQuery } from '@/features/post-page/api'
import { ProgressBar, Spinner } from '@/shared/ui'
import { PostBlock } from '@/shared/ui/post-block'
import { ScrollArea } from '@/shared/ui/scrollbar'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'

import noData from '../../../../../public/images/no-data.svg'

const POSTS_PER_PAGE = 8
const LAZY_POSTS_PER_PAGE = 9

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
  } = useGetPublicPostsByUserIdQuery({
    pageSize: POSTS_PER_PAGE,
    userId,
  })
  const { data: postLikes } = usePostLikesQuery({ postId })
  const [statusLiked, setStatusLiked] = useState<boolean | undefined>(undefined)
  const [trigger, { isFetching: isFetchingMore }] = useLazyGetPublicPostsByUserIdQuery()
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
    setStatusLiked(postLikes?.items.some(user => user.userId === me?.userId))
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
  }, [
    posts,
    isFetchingMore,
    viewportRef,
    trigger,
    loadMorePosts,
    postLikes?.items,
    userId,
    me?.userId,
  ])

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

  return (
    <>
      <ScrollArea className={'h-[91vh] max-w-[972px] mx-auto'} viewportRef={viewportRef}>
        <div className={'mb-6 flex flex-col items-center mr-2'}>
          <div className={'max-w-[490px] mb-9 border-b border-dark-100'}>
            <Publication
              me={me}
              postImages={post.images.map(image => image.url)}
              publication={post}
              statusLiked={statusLiked}
              timeAgo={timeAgo}
            />
          </div>
          <PostBlock data={posts} me={me} />
        </div>
      </ScrollArea>
    </>
  )
}
