import { Avatars } from '@/features/post-page/ui/comments/comments'
import { Avatar, Typography } from '@/shared/ui'

type CommentBodyProps = {
  avatars: Avatars[]
  content: string
  userName: string
}
const CommentBody = ({ avatars, content, userName }: CommentBodyProps) => {
  return (
    <div className={'flex mt-4'}>
      <div className={'flex justify-center items-start'}>
        <Avatar
          alt={'User Avatar'}
          onClick={() => alert('redirect to user profile')}
          size={9}
          src={avatars[0].url}
        />
      </div>
      <div className={'flex flex-col ml-3 mr-6 gap-1 text-wrap'}>
        <Typography as={'p'} className={'break-words whitespace-normal'} variant={'regular14'}>
          <Typography as={'span'} className={'gap-1'} variant={'bold14'}>
            {userName}
          </Typography>{' '}
          {content}
        </Typography>
      </div>
    </div>
  )
}

export { CommentBody, type CommentBodyProps }
