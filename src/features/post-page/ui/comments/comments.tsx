import { Comment } from './comment'

type CommentsProps = {
  items: {
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
  }[]
}

type Avatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

const Comments = (props: CommentsProps) => {
  const { items } = props

  return (
    <div>
      {items.map((item, index) => {
        return <Comment {...item} key={index} />
      })}
    </div>
  )
}

export { type Avatars, Comments, type CommentsProps }
