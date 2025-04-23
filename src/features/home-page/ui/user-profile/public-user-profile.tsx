'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { PaidStatus } from '@/assets/icons'
import { useMeQuery } from '@/features/auth/api'
import { PostUserProfile } from '@/features/home-page/ui/post-user-profile'
import { PATH } from '@/shared/constants'
import { Avatar, Button, ProgressBar, Typography } from '@/shared/ui'
import { ScrollArea } from '@/shared/ui/scrollbar'

import {
  useGetPublicPostsByUserIdQuery,
  useGetPublicUserProfileQuery,
  useLazyGetPublicPostsByUserIdQuery,
} from './api/user-profile.api'

interface UserProfileProps {
  paidStatus?: boolean
  userId: number
}
const POSTS_PER_PAGE = 8
const LAZY_POSTS_PER_PAGE = 9

export const PublicUserProfile = ({ paidStatus = true, userId }: UserProfileProps) => {
  const { data: isAuth } = useMeQuery()

  const { data: publicProfile, isLoading: profileLoading } = useGetPublicUserProfileQuery(userId)

  const { data: initialPosts, isLoading: postsLoading } = useGetPublicPostsByUserIdQuery({
    pageSize: POSTS_PER_PAGE,
    userId,
  })

  const [posts, setPosts] = useState(initialPosts?.items || [])

  const [trigger, { isFetching: isFetchingMore }] = useLazyGetPublicPostsByUserIdQuery()

  const viewportRef = useRef<HTMLDivElement>(null)
  const loadMorePosts = useCallback(() => {
    if (
      posts &&
      posts.length > 0 &&
      initialPosts?.totalCount !== undefined && // Проверка, что totalCount определен
      initialPosts.totalCount > posts.length &&
      !isFetchingMore
    ) {
      const lastPost = posts[posts.length - 1]

      trigger({
        endCursorPostId: lastPost.id,
        pageSize: LAZY_POSTS_PER_PAGE,
        userId,
      })
    }
  }, [posts, isFetchingMore, trigger, userId, initialPosts])

  useEffect(() => {
    if (initialPosts?.items) {
      setPosts(initialPosts.items) // Обновляем посты после загрузки данных
    }
  }, [initialPosts]) // Следим за изменениями в initialPosts

  useEffect(() => {
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
  }, [posts, isFetchingMore, viewportRef, trigger, loadMorePosts])

  const handlePostDeletion = (postId: number) => {
    // Удалить пост локально из состояния
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
  }

  if (profileLoading || postsLoading) {
    return <ProgressBar />
  }

  return (
    <ScrollArea viewportRef={viewportRef}>
      <div className={'flex flex-col mt-9 max-w-[932px] gap-[53px] mx-auto'}>
        <div className={'flex mx-auto gap-9 w-full'}>
          <div className={'w-[204px]'}>
            <Avatar
              alt={'avatar'}
              height={publicProfile?.avatars[0]?.height}
              size={48}
              src={publicProfile?.avatars[0]?.url}
              width={publicProfile?.avatars[0]?.width}
            />
          </div>

          <div className={'flex flex-col'}>
            <div className={'flex w-full justify-between'}>
              <div className={'flex items-center gap-3'}>
                <Typography variant={'h1'}>{publicProfile?.userName}</Typography>
                {paidStatus && <PaidStatus className={'w-6 h-6'} />}
              </div>
              {isAuth && publicProfile?.id == isAuth.userId ? (
                <Button asChild size={'medium'} variant={'secondary'}>
                  <a href={PATH.PROFILE_SETTINGS.replace(':id', userId.toString())}>
                    Profile Settings
                  </a>
                </Button>
              ) : null}
            </div>
            <div className={'flex gap-24 mt-5 mb-6'}>
              <div className={'flex flex-col items-start'}>
                <Typography variant={'regular14'}>
                  {publicProfile?.userMetadata.following}
                </Typography>
                <Typography variant={'regular14'}>Following</Typography>
              </div>
              <div className={'flex flex-col items-start'}>
                <Typography variant={'regular14'}>
                  {publicProfile?.userMetadata.followers}
                </Typography>
                <Typography variant={'regular14'}>Followers</Typography>
              </div>
              <div className={'flex flex-col items-start'}>
                <Typography variant={'regular14'}>
                  {publicProfile?.userMetadata.publications}
                </Typography>
                <Typography variant={'regular14'}>Publications</Typography>
              </div>
            </div>

            <Typography variant={'regular14'}>{publicProfile?.aboutMe}</Typography>
          </div>
        </div>

        <div className={'w-full flex flex-wrap gap-2 h-[450px] '}>
          {Array.isArray(posts) && posts.length > 0
            ? posts.map(post => (
                <div className={'w-[calc(25%-6px)] aspect-square'} key={post.id}>
                  <PostUserProfile
                    me={isAuth}
                    onDelete={handlePostDeletion} // Передаем функцию удаления
                    post={post}
                  />
                </div>
              ))
            : null}

          {isFetchingMore && <ProgressBar />}
        </div>
      </div>
    </ScrollArea>
  )
}
