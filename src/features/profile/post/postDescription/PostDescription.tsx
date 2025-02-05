import { Avatar, Typography } from '@/shared/ui'

type PostDescriptionProps = {
  avatar?: string
  createdAt: string
  description?: string
  userName: string
}

const PostDescription = (props: PostDescriptionProps) => {
  const { avatar, description, userName } = props

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
        <div>
          <Typography as={'p'} className={'text-light-900'} variant={'small'}>
            2 hours ago
          </Typography>
        </div>
      </div>
    </div>
  )
}

export { PostDescription }
