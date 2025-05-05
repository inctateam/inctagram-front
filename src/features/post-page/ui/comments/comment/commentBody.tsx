import { AvatarType } from '@/features/post-page/types'
import { Description } from '@/features/post-page/ui/postDescription'

type CommentBodyProps = {
  avatars: AvatarType[]
  content: string
  userName: string
}
const CommentBody = ({ avatars, content, userName }: CommentBodyProps) => {
  return (
    <div className={'flex mt-4'}>
      {/*      <div className={'flex justify-center items-start'}>
        <Avatar
          alt={'User Avatar'}
          className={'block sm:hidden'}
          height={avatars[0].height}
          onClick={() => alert('redirect to user profile')}
          size={9}
          src={avatars[0]?.url}
          width={avatars[0].width}
        />
      </div>
      <div className={'flex flex-col ml-3 mr-6 gap-1 text-wrap'}>
        <Typography as={'p'} className={'break-words whitespace-normal'} variant={'regular14'}>
          <Typography as={'span'} className={'gap-1'} variant={'bold14'}>
            {userName}
          </Typography>{' '}
          {content}
        </Typography>
      </div>*/}
      <Description avatar={avatars[0]?.url} description={content} userName={userName} />
    </div>
  )
}

export { CommentBody, type CommentBodyProps }
