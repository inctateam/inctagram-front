'use client'
import { Avatar, Typography } from '@/shared/ui'
import Link from 'next/link'

type Props = {
  avatarOwner: string
  ownerId: number
  userName: string
}
export const AvatarBlock = ({ avatarOwner, ownerId, userName }: Props) => {
  return (
    <Link
      className={'flex justify-start items-center gap-3 hover:opacity-80'}
      href={`/profile/${ownerId}`}
    >
      <Avatar alt={'User Avatar'} size={9} src={avatarOwner} />
      <Typography className={'cursor-pointer'} variant={'h2'}>
        {userName}
      </Typography>
    </Link>
  )
}
