'use client'

import { useState } from 'react'

import { useUserPostsQuery } from '@/features/post-page/api'
import { UserPostsArgs } from '@/features/post-page/types'
import { PostModal } from '@/features/post-page/ui/post'
import { Avatar, Button, Card, ScrollArea, Typography } from '@/shared/ui'
import Link from 'next/link'

import { PublicPostItem } from '../../types'
import { useGetPublicUserProfileQuery } from './api/user-profile.api'

interface UserProfileProps {
  isAuth: boolean
  userId: number
}

export const UserProfile = ({ isAuth, userId }: UserProfileProps) => {
  const { data: publicProfile } = useGetPublicUserProfileQuery(userId.toString())

  //const { data: posts } = useGetPostsByUserNameQuery(publicProfile?.userName || '')
  const { data: posts } = useUserPostsQuery({ userName: publicProfile?.userName } as UserPostsArgs)
  const [openPostModal, setOpenPostModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<PublicPostItem | null>(null)

  const handlePostClick = (post: PublicPostItem) => {
    setSelectedPost(post)
    setOpenPostModal(true)
  }

  return (
    <div className={'flex flex-col mt-9 max-w-[932px] max-h-[660px] gap-[53px] overflow-hidden'}>
      <div className={'flex mx-auto gap-9 w-full'}>
        <div className={'w-[204px'}>
          <Avatar alt={'avatar'} size={48} src={publicProfile?.avatars[0]?.url} />
        </div>
        <div className={'flex flex-col'}>
          <div className={'flex w-full justify-between'}>
            <Typography variant={'h1'}>{publicProfile?.userName}</Typography>
            {isAuth ? (
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
            : Array.from({ length: 8 }).map((_, index) => (
                <div className={'w-[calc(25%-6px)] aspect-square'} key={index}>
                  <Card className={'flex items-center justify-center w-full h-full'}>
                    Empty Post {index + 1}
                  </Card>
                </div>
              ))}
        </div>
        {selectedPost && (
          <PostModal
            onOpenChange={setOpenPostModal}
            open={openPostModal}
            post={selectedPost}
            postId={selectedPost.id}
          />
        )}
      </ScrollArea>
    </div>
  )
}
