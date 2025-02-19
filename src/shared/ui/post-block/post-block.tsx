import { PublicPostItem, PublicPostsResponse } from '@/features/home-page/types'
import { Post } from '@/shared/ui/post'

type Props = {
  data: PublicPostsResponse
}

export const PostBlock = ({ data }: Props) => {
  return (
    <ul className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'}>
      {data.items.map((item: PublicPostItem) => (
        <div key={item.id}>
          <Post item={item} />
        </div>
      ))}
    </ul>
  )
}
