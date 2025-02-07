import { useState } from 'react'

import Heart from '@/assets/icons/components/filled-outlined-pairs/Heart'
import HeartOutline from '@/assets/icons/components/filled-outlined-pairs/HeartOutline'
import { CommentBody } from '@/features/post-page/ui/comments/comment/commentBody'
import { CommentInfo } from '@/features/post-page/ui/comments/comment/commentInfo'
import { Avatars } from '@/features/post-page/ui/comments/comments'
import { timeAgo } from '@/shared/utils'

import { Answers } from '../../answers'

export type CommentProps = {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: Avatars[]
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

const Comment = (props: CommentProps) => {
  const { answerCount, content, createdAt, from, isLiked, likeCount } = props
  const { avatars, username } = from
  const [showAnswers, setShowAnswers] = useState(true)

  return (
    <div className={'flex flex-col w-fit'}>
      <div className={'flex'}>
        <div className={'flex flex-col'}>
          <CommentBody avatars={avatars} content={content} userName={username} />
          <CommentInfo
            answerCount={answerCount}
            createdAt={timeAgo(createdAt)}
            isLiked={isLiked}
            likeCount={likeCount}
            onClick={() => setShowAnswers(prev => !prev)}
            showAnswers={showAnswers}
          />
        </div>
        <div className={'flex pt-4'}>{isLiked ? <Heart color={'red'} /> : <HeartOutline />}</div>
      </div>

      {showAnswers && <Answers />}
    </div>
  )
}

export { Comment }

// export type CommentItems = {
//   commentId: number
//   content: string
//   createdAt: string
//   from: User
//   id: number
//   isLiked: boolean
//   likeCount: number
// }
// export type User = {
//   avatars: AvatarProps[]
//   id: number
//   username: string
// }
// export type AvatarProps = {
//   createdAt: string
//   fileSize: number
//   height: number
//   url: string
//   width: number
// }
