import { CommentItems } from '@/features/post-page/types'

import { Comment } from './comment'

type CommentsItemsProps = {
  comments: CommentItems[]
  isAuth: boolean
}
const Comments = (props: CommentsItemsProps) => {
  const { comments, isAuth } = props

  return (
    <div className={'flex flex-col h-full'}>
      {comments.map((comment, index) => {
        return <Comment comment={comment} isAuth={isAuth} key={index} />
      })}
    </div>
  )
}

export { Comments }
