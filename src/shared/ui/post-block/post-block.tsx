import { MeResponse } from '@/features/auth/types'
import { PublicPostsResponse } from '@/features/home-page/types'
import { Post } from '@/shared/ui/post'

type Props = {
  className?: string
  data: PublicPostsResponse
  me: MeResponse | undefined
  onClosePostModal?: () => void
  openPostId?: null | number
}

export const PostBlock = ({ className, data, me, onClosePostModal, openPostId }: Props) => {
  return (
    <ul className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>
      {data?.items.map(item => (
        <div key={item.id}>
          <Post
            item={item}
            me={me}
            onClosePostModal={onClosePostModal}
            openPost={openPostId === item.id}
          />
        </div>
      ))}
    </ul>
  )
}
