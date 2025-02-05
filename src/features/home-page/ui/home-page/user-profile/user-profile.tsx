'use client'
import { Avatar, Button, Card, Typography } from '@/shared/ui'
import Link from 'next/link'

import {
  useGetPostsByUserNameQuery,
  useGetProfileByUserNameQuery,
  useGetProfileQuery,
} from './api/user-profile.api'
export const UserProfile = () => {
  const { data: profile } = useGetProfileQuery()

  const { data: profileByUserName } = useGetProfileByUserNameQuery(profile?.userName || '')

  const { data: posts } = useGetPostsByUserNameQuery(profile?.userName || '')

  return (
    <div className={'flex flex-col mt-9 max-w-[932px] max-h-[660px] gap-[53px] overflow-hidden'}>
      <div className={'flex mx-auto gap-9 w-full'}>
        <div className={'w-[204px'}>
          <Avatar alt={'avatar'} size={48} src={profile?.avatars[0].url} />
        </div>
        <div className={'flex flex-col'}>
          <div className={'flex justify-between'}>
            <Typography variant={'h1'}>{profile?.userName}</Typography>
            <Button size={'medium'} variant={'secondary'}>
              Profile Settings
            </Button>
          </div>
          <div className={'flex gap-24 mt-5 mb-6'}>
            <div className={'flex flex-col items-start'}>
              <Typography variant={'regular14'}>{profileByUserName?.followingCount}</Typography>
              <Typography variant={'regular14'}>Following</Typography>
            </div>
            <div className={'flex flex-col items-start'}>
              <Typography variant={'regular14'}>{profileByUserName?.followersCount}</Typography>
              <Typography variant={'regular14'}>Followers</Typography>
            </div>
            <div className={'flex flex-col items-start'}>
              <Typography variant={'regular14'}>{profileByUserName?.publicationsCount}</Typography>
              <Typography variant={'regular14'}>Publications</Typography>
            </div>
          </div>

          <Typography variant={'regular14'}>{profile?.aboutMe}</Typography>
        </div>
      </div>

      <div className={'w-full flex gap-1 flex-wrap max-h-[660px] overflow-hidden'}>
        {Array.isArray(posts?.items) && posts.items.length > 0
          ? // Если есть посты, отрисовываем их
            posts?.items.slice(0, 8).map(post => (
              <div className={'w-full max-w-[228px] aspect-square'} key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <Card className={'flex items-center justify-center w-full h-full'}>
                    Post {post.id}
                  </Card>
                </Link>
              </div>
            ))
          : // Если постов нет, отрисовываем 8 пустых карточек
            Array.from({ length: 8 }).map((_, index) => (
              <div className={'w-full max-w-[228px] aspect-square'} key={index}>
                <Card className={'flex items-center justify-center w-full h-full'}>
                  Empty Post {index + 1}
                </Card>
              </div>
            ))}
      </div>
    </div>
  )
}
