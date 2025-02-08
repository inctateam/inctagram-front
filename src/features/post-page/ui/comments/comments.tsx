import { CommentItems } from '@/features/post-page/types'

import { Comment } from './comment'

type CommentsItemsProps = {
  comments: CommentItems[]
}
const Comments = (props: CommentsItemsProps) => {
  const { comments } = props

  return (
    <div className={'flex flex-col h-full'}>
      {comments.map((comment, index) => {
        return <Comment {...comment} key={index} />
      })}
    </div>
  )
}

export { Comments }
