import { PostsPage } from '@/features/post-page/ui/posts-page'

type Props = {
  params: { id: string; postId: string }
}

const Posts = ({ params }: Props) => {
  const { id, postId } = params

  return <PostsPage postId={Number(postId)} userId={Number(id)} />
}

export default Posts
