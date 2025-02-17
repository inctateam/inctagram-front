'use client'

import { useState } from 'react'

import { PaidStatus } from '@/assets/icons'
import { useMeQuery } from '@/features/auth/api'
import { PostModal } from '@/features/post-page/ui/post'
import { Avatar, Button, Card, ProgressBar, ScrollArea, Typography } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  useGetPublicPostsByUserIdQuery,
  useGetPublicUserProfileQuery,
} from './api/user-profile.api'
import { Post } from './types/user-profile.types'

interface UserProfileProps {
  paidStatus?: boolean
  userId: number
}

export const PublicUserProfile = ({ paidStatus = true, userId }: UserProfileProps) => {
  const { data: isAuth } = useMeQuery()

  const { data: publicProfile, isLoading: profileLoading } = useGetPublicUserProfileQuery(
    userId.toString()
  )
  const router = useRouter()
  const { data: posts, isLoading: postsLoading } = useGetPublicPostsByUserIdQuery(userId.toString())

  const [openPostModal, setOpenPostModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    setOpenPostModal(true)
  }

  if (profileLoading || postsLoading) {
    return <ProgressBar />
  }

  return (
    <div
      className={
        'flex flex-col mt-9 max-w-[932px] max-h-[660px] gap-[53px] overflow-hidden mx-auto'
      }
    >
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
              <Button
                onClick={() => router.push(`/profile/${userId}/settings`)}
                size={'medium'}
                variant={'secondary'}
              >
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
      <ScrollArea className={'max-h-[660px] overflow-y-auto'}>
        <div className={'w-full flex flex-wrap gap-2'}>
          {Array.isArray(posts?.items) && posts.items.length > 0
            ? posts.items.map(post => (
                <div className={'w-[calc(25%-6px)] aspect-square'} key={post.id}>
                  <Link href={'#'} onClick={() => handlePostClick(post)}>
                    <Card
                      className={'flex items-center justify-center w-full h-full'}
                      style={{
                        backgroundImage: `url(${post.images[0].url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                      }}
                    />
                  </Link>
                </div>
              ))
            : null}
        </div>
        {selectedPost && (
          <PostModal onOpenChange={setOpenPostModal} open={openPostModal} post={selectedPost}>
            <ImageContent itemImages={selectedPost.images} />
          </PostModal>
        )}
      </ScrollArea>
    </div>
  )
}
