import { PublicPostItem, PublicPostsResponse } from '@/features/home-page/types'
import { Post } from '@/shared/ui/post'

type Props = {
  className?: string
  data: PublicPostsResponse
}

export const PostBlock = ({ className, data }: Props) => {
  return (
    <ul className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>
      {data.items.map((item: PublicPostItem) => (
        <div key={item.id}>
          <Post item={item} />
        </div>
      ))}
    </ul>
  )
}
