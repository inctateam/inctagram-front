'use client'
import { useState } from 'react'

import { CloseOutline } from '@/assets/icons'
import Heart from '@/assets/icons/components/filled-outlined-pairs/Heart'
import HeartOutline from '@/assets/icons/components/filled-outlined-pairs/HeartOutline'
import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { useCommentAnswersQuery, useCreateCommentAnswerMutation } from '@/features/post-page/api'
import { CommentItems } from '@/features/post-page/types'
import { CommentBody } from '@/features/post-page/ui/comments/comment/commentBody'
import { CommentInfo } from '@/features/post-page/ui/comments/comment/commentInfo'
import { CommentForm } from '@/features/post-page/ui/interactionBlock/commentForm'
import { IconButton } from '@/shared/ui'
import { timeAgo } from '@/shared/utils'

import { Answers } from '../../answers'

type CommentProps = {
  comment: CommentItems
  isAuth: boolean
}
const Comment = (props: CommentProps) => {
  const { comment, isAuth } = props
  const { content, createdAt, from, id, isLiked, likeCount, postId } = comment
  const { avatars, username } = from
  const [showAnswers, setShowAnswers] = useState(false)
  const {
    data: answers,
    isLoading,
    refetch: refetchAnswers,
  } = useCommentAnswersQuery({ commentId: id, postId })
  const [addCommentAnswer] = useCreateCommentAnswerMutation()
  const [isAnswerMode, setIsAnswerMode] = useState(false)
  const onAnswerClickHandler = () => {
    setIsAnswerMode(true)
    // alert(comment.id)
    // alert(comment.postId)
  }
  const onAnswerSubmitHandler = async (content: string) => {
    if (content.length === 0) {
      return
    }
    try {
      await addCommentAnswer({ commentId: comment.id, content, postId: comment.postId }).unwrap()
      refetchAnswers()
    } catch (e) {
      handleRequestError(e)
    } finally {
      setIsAnswerMode(false)
    }
  }

  return (
    <div className={'flex flex-col w-full'}>
      <div className={'flex justify-between'}>
        <div className={'flex flex-col'}>
          <CommentBody avatars={avatars} content={content} userName={username} />
          {isAnswerMode && (
            <div className={'flex border-dark-100 border-b ml-12 mb-2'}>
              <CommentForm onSubmit={onAnswerSubmitHandler} />
              <IconButton onClick={() => setIsAnswerMode(false)}>
                <CloseOutline />
              </IconButton>
            </div>
          )}
          <CommentInfo
            answerCount={answers?.items.length}
            createdAt={timeAgo(createdAt)}
            isAuth={isAuth}
            isLiked={isLiked}
            likeCount={likeCount}
            onAnswerClickHandler={onAnswerClickHandler}
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
