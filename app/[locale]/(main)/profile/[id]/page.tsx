'use client'
import { useMeQuery } from '@/features/auth/api'
import { ProfilePage } from '@/features/home-page/ui/user-profile/profile-page'
import { ProgressBar } from '@/shared/ui'
// import Link from 'next/link'

export default function Profile({ params: { id } }: { params: { id: string } }) {
  const { data: me, isLoading } = useMeQuery()

  if (isLoading) {
    return <ProgressBar />
  }

  return (
    <div>
      <ProfilePage isAuth={!!me?.userId} userId={me?.userId} />
      {/*Profile {id}*/}
      {/*<div className={'w-full flex gap-1 flex-wrap'}>*/}
      {/*  {Array.from({ length: 5 }).map((_, index) => (*/}
      {/*    <div className={'w-full max-w-xs aspect-square'} key={index}>*/}
      {/*      <Link href={`/posts/${4900}`}>*/}
      {/*        <Card className={'flex items-center justify-center w-full h-full'}>*/}
      {/*          Post {index + 1}*/}
      {/*        </Card>*/}
      {/*      </Link>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  )
}
