'use client'
import { usePostQuery } from '@/features/post-page/api'
import { PostModal } from '@/features/post-page/ui/post/post-modal'
import { ProgressBar } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'

export default function Post({ params: { id } }: { params: { id: string } }) {
  const postId = Number(id)

  const { data: post, error, isLoading } = usePostQuery({ postId })

  if (isLoading) {
    return <ProgressBar />
  }

  if (error) {
    return <div>Error loading post</div>
  }
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    // <PostModal onOpenChange={() => router.back()} open post={post}>
    <PostModal onOpenChange={open => !open} open post={post}>
      <ImageContent itemImages={post?.images.map(image => image.url) ?? []} />
    </PostModal>
  )
}
