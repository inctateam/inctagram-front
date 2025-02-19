'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { PaidStatus } from '@/assets/icons'
import { useMeQuery } from '@/features/auth/api'
import { PostUserProfile } from '@/features/home-page/ui/post-user-profile'
import { Avatar, Button, ProgressBar, Typography } from '@/shared/ui'

import {
  useGetPublicPostsByUserIdQuery,
  useGetPublicUserProfileQuery,
} from './api/user-profile.api'
import InfiniteScroll from './infinite-scroll'

interface UserProfileProps {
  paidStatus?: boolean
  userId: number
}

export const PublicUserProfile = ({ paidStatus = true, userId }: UserProfileProps) => {
  const { data: isAuth } = useMeQuery()
  const ref = useRef<HTMLDivElement>(null)
  const { data: publicProfile, isLoading: profileLoading } = useGetPublicUserProfileQuery(userId)

  const [pageSize, setPageSize] = useState(8)
  const [endCursorPostId, setEndCursorPostId] = useState<number | undefined>(undefined)
  const { data: posts, isLoading: postsLoading } = useGetPublicPostsByUserIdQuery({
    endCursorPostId,
    pageSize,
    userId,
  })

  const loadMorePosts = (isVisible: boolean) => {
    console.log(isVisible)
    if (isVisible && posts && posts.items.length > 0) {
      const lastPost = posts.items[posts.items.length - 1]
      setPageSize(prevPageSize => prevPageSize + 8)
      setEndCursorPostId(lastPost.id)
    }
  }

  if (profileLoading || postsLoading) {
    return <ProgressBar />
  }

  return (
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
              <Typography variant={'regular14'}>{publicProfile?.userMetadata.following}</Typography>
              <Typography variant={'regular14'}>Following</Typography>
            </div>
            <div className={'flex flex-col items-start'}>
              <Typography variant={'regular14'}>{publicProfile?.userMetadata.followers}</Typography>
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
      {/* <ScrollArea className={'max-h-[660px] overflow-y-auto'}> */}
      <div className={'w-full flex flex-wrap gap-2'}>
        {Array.isArray(posts?.items) && posts.items.length > 0
          ? posts.items.map(post => (
              <div className={'w-[calc(25%-6px)] aspect-square'} key={post.id}>
                <PostUserProfile post={post} />
              </div>
            ))
          : null}
      </div>
      {/* </ScrollArea> */}
    </div>
  )
}
