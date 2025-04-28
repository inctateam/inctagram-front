import { Avatar, Typography } from '@/shared/ui'
import { formatDistanceToNow } from 'date-fns'

type PostDescriptionProps = {
  avatar?: string
  createdAt: string
  description?: string
  isTimeAgoMode?: boolean
  userName: string
}

const Description = (props: PostDescriptionProps) => {
  const { avatar, createdAt, description, isTimeAgoMode = true, userName } = props

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  return (
    <div className={'flex gap-3'}>
      <div>
        <Avatar alt={'User Avatar'} size={9} src={avatar} />
      </div>
      <div>
        <Typography as={'p'} className={'text-balance mb-1'} variant={'regular14'}>
          <Typography as={'span'} variant={'bold14'}>
            {userName}
          </Typography>{' '}
          {description}
        </Typography>
        {isTimeAgoMode && (
          <div>
            <Typography as={'p'} className={'text-light-900'} variant={'small'}>
              {timeAgo}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}

export { Description }
