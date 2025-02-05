import { Avatar, Typography } from '@/shared/ui'
import { format } from 'date-fns'
type LikesListProps = {
  avatarWhoLikes: Array<string>
  createdAt: string
  isLiked: boolean
  likesCount: number
  updatedAt: string
}

const LikesList = (props: LikesListProps) => {
  const { avatarWhoLikes, createdAt, isLiked, likesCount, updatedAt } = props

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    return format(date, 'MMMM d, yyyy')
  }

  return (
    <div className={'flex flex-col gap-1'}>
      <div className={'flex gap-3'}>
        <div className={'flex'}>
          {avatarWhoLikes.map((avatar, index) => {
            return <Avatar alt={'Avatar who likes'} key={index} size={6} src={avatar} />
          })}
        </div>
        <Typography variant={'regular14'}>
          {likesCount}{' '}
          <Typography as={'span'} variant={'bold14'}>
            {likesCount === 1 ? 'Like' : 'Likes'}
          </Typography>
        </Typography>
      </div>
      <Typography className={'text-light-900'}>{formatDate(createdAt)}</Typography>
    </div>
  )
}

export { LikesList, type LikesListProps }
