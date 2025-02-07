import Heart from '@/assets/icons/components/filled-outlined-pairs/Heart'
import HeartOutline from '@/assets/icons/components/filled-outlined-pairs/HeartOutline'
import { Answer } from '@/features/post-page/types'
import { CommentBody } from '@/features/post-page/ui/comments/comment/commentBody'
import { CommentInfo } from '@/features/post-page/ui/comments/comment/commentInfo'
import { timeAgo } from '@/shared/utils'
type AnswersProps = {
  answers: Answer[]
}
const Answers = (props: AnswersProps) => {
  const { answers } = props

  return (
    <div className={'pl-12'}>
      {answers.map((answer, index) => (
        <div className={'flex justify-between'} key={index}>
          <div>
            <CommentBody
              avatars={answer.from.avatars}
              content={answer.content}
              userName={answer.from.username}
            />
            <CommentInfo
              createdAt={timeAgo(answer.createdAt)}
              likeCount={answer.likeCount}
              onClick={() => alert('answer')}
            />
          </div>
          <div className={'flex pt-4'}>
            {answer.isLiked ? <Heart color={'red'} /> : <HeartOutline />}
          </div>
        </div>
      ))}
    </div>
  )
}

export { Answers }
