'use client'
import { useState } from 'react'

import Heart from '@/assets/icons/components/filled-outlined-pairs/Heart'
import HeartOutline from '@/assets/icons/components/filled-outlined-pairs/HeartOutline'
import { useCommentAnswersQuery } from '@/features/post-page/api'
import { CommentItems } from '@/features/post-page/types'
import { CommentBody } from '@/features/post-page/ui/comments/comment/commentBody'
import { CommentInfo } from '@/features/post-page/ui/comments/comment/commentInfo'
import { timeAgo } from '@/shared/utils'

import { Answers } from '../../answers'

type CommentProps = {
  comment: CommentItems
  isAuth: boolean
}
const Comment = (props: CommentProps) => {
  const { comment, isAuth } = props
  const { answerCount, content, createdAt, from, id, isLiked, likeCount, postId } = comment
  const { avatars, username } = from
  const [showAnswers, setShowAnswers] = useState(false)
  const { data: answers, isLoading } = useCommentAnswersQuery({ commentId: id, postId })

  return (
    <div className={'flex flex-col w-full'}>
      <div className={'flex justify-between'}>
        <div className={'flex flex-col'}>
          <CommentBody avatars={avatars} content={content} userName={username} />
          <CommentInfo
            answerCount={answerCount}
            createdAt={timeAgo(createdAt)}
            isAuth={isAuth}
            isLiked={isLiked}
            likeCount={likeCount}
            // onClick={() => setShowAnswers(prev => !prev)}
            onClick={() => setShowAnswers(!showAnswers)}
            showAnswers={showAnswers}
          />
        </div>
        {isAuth && (
          <div className={'flex pt-4'}>{isLiked ? <Heart color={'red'} /> : <HeartOutline />}</div>
        )}
      </div>
      {showAnswers && isLoading && <div>loading</div>}
      {showAnswers && answers && <Answers answers={answers?.items ?? []} isAuth={isAuth} />}
    </div>
  )
}

export { Comment }
