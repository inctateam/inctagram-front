import { Avatar, Typography } from '@/shared/ui'
import { format } from 'date-fns'

type LikesListProps = {
  avatarWhoLikes: string[]
  createdAt?: string
  likesCount: number
}

const LikesList = (props: LikesListProps) => {
  const { avatarWhoLikes, createdAt, likesCount } = props

  function formatDate(dateString: string) {
    const date = new Date(dateString)

    return format(date, 'MMMM d, yyyy')
  }
  const formatedDate = createdAt ? formatDate(createdAt) : null

  return (
    <div className={'flex flex-col gap-1'}>
      <div className={'flex mr-3'}>
        <div className={'flex -space-x-2'}>
          {avatarWhoLikes.slice(0, 3).map((avatar, index) => {
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
      {createdAt && (
        <Typography className={'text-light-900'} variant={'small'}>
          {formatedDate}
        </Typography>
      )}
    </div>
  )
}

export { LikesList, type LikesListProps }
