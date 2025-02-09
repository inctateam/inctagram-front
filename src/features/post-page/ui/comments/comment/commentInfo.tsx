import { useState } from 'react'

import { Typography } from '@/shared/ui'

type CommentInfoProps = {
  answerCount?: number
  answers?: string
  createdAt: string
  isAuth: boolean
  isLiked?: boolean
  likeCount?: number
  onClick: (showAnswer: boolean) => void
  showAnswers?: boolean
}
const CommentInfo = ({
  answerCount,
  createdAt,
  isAuth,
  likeCount,
  onClick,
  showAnswers,
}: CommentInfoProps) => {
  return (
    <div className={'flex flex-col ml-12'}>
      <div className={'flex gap-3'}>
        <Typography as={'p'} className={'text-light-900'} variant={'small'}>
          {createdAt}
        </Typography>
        {isAuth && (
          <>
            <Typography as={'p'} className={'text-light-900'} variant={'semiSmall'}>
              Like: {likeCount}
            </Typography>
            <Typography as={'p'} className={'text-light-900'} variant={'semiSmall'}>
              Answer
            </Typography>
          </>
        )}
      </div>
      {answerCount !== undefined && answerCount > 0 && (
        <div>
          <Typography
            as={'button'}
            className={
              'flex pl-0 mt-2 justify-start text-light-900 cursor-pointer hover:text-light-700'
            }
            onClick={() => onClick(!showAnswers)}
            variant={'semiSmall'}
          >
            {showAnswers ? `— Hide answers (${answerCount})` : `— Show answers (${answerCount})`}
          </Typography>
        </div>
      )}
    </div>
  )
}

export { CommentInfo, type CommentInfoProps }
