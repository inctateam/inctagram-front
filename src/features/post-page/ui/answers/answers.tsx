import Heart from '@/assets/icons/components/filled-outlined-pairs/Heart'
import HeartOutline from '@/assets/icons/components/filled-outlined-pairs/HeartOutline'
import { CommentBody } from '@/features/post-page/ui/comments/comment/commentBody'
import { CommentInfo } from '@/features/post-page/ui/comments/comment/commentInfo'
import { MoakAnswers } from '@/features/post-page/ui/post/testObj'
import { timeAgo } from '@/shared/utils'

const Answers = () => {
  return (
    <div className={'pl-12'}>
      {MoakAnswers.map((answer, index) => (
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
