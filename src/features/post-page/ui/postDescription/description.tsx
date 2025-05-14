import { Avatar, Typography } from '@/shared/ui'
import { formatDistanceToNow } from 'date-fns'

type PostDescriptionProps = {
  avatar?: string
  createdAt?: string
  description?: string
  userName: string
}

const Description = (props: PostDescriptionProps) => {
  const { avatar, createdAt, description, userName } = props

  const timeAgo = createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : null

  return (
    <div className={'flex gap-4 pr-3 mb-2'}>
      <div>
        <Avatar alt={'User Avatar'} size={9} src={avatar} />
      </div>
      <div className={'flex flex-col'}>
        <Typography as={'p'} className={'mb-1 break-all'} variant={'regular14'}>
          <Typography as={'span'} variant={'bold14'}>
            {userName}
          </Typography>{' '}
          {description}
        </Typography>
        {createdAt && (
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
