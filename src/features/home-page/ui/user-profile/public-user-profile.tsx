'use client'

import { useCallback, useEffect, useRef } from 'react'

import { PaidStatus } from '@/assets/icons'
import { useMeQuery } from '@/features/auth/api'
import { PostUserProfile } from '@/features/home-page/ui/post-user-profile'
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

  const { data: posts, isLoading: postsLoading } = useGetPublicPostsByUserIdQuery({
    pageSize: POSTS_PER_PAGE,
    userId,
  })

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

  if (profileLoading || postsLoading) {
    return <ProgressBar />
  }

  return (
    <ScrollArea viewportRef={viewportRef}>
      <div className={'flex flex-col mt-9 max-w-[932px] gap-[53px] mx-auto'}>
        <div className={'flex mx-auto gap-9 w-full'}>
          <div className={'w-[204px'}>
            <Avatar alt={'avatar'} size={48} src={publicProfile?.avatars[0]?.url} />
          </div>

          <div className={'flex flex-col'}>
            <div className={'flex w-full justify-between'}>
              <div className={'flex items-center gap-3'}>
                <Typography variant={'h1'}>{publicProfile?.userName}</Typography>
                {paidStatus && <PaidStatus className={'w-6 h-6'} />}
              </div>
              {isAuth && publicProfile?.id == isAuth.userId ? (
                <Button size={'medium'} variant={'secondary'}>
                  Profile Settings
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
          {Array.isArray(posts?.items) && posts.items.length > 0
            ? posts.items.map(post => (
                <div className={'w-[calc(25%-6px)] aspect-square'} key={post.id}>
                  <PostUserProfile post={post} />
                </div>
              ))
            : null}

          {isFetchingMore && <ProgressBar />}
        </div>
      </div>
    </ScrollArea>
  )
}
