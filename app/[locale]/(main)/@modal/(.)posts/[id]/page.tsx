'use client'
import { usePostQuery } from '@/features/post-page/api'
import { PostModal } from '@/features/post-page/ui/post'
import { ProgressBar } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { useRouter } from 'next/navigation'

export default function Post({ params: { id } }: { params: { id: string } }) {
  const router = useRouter()

  const { data, isLoading } = usePostQuery({ postId: Number(id) })

  if (isLoading) {
    return <ProgressBar />
  }

  return (
    <PostModal onOpenChange={() => router.back()} open post={data!}>
      <ImageContent itemImages={data!.images.map(image => image.url)} />
    </PostModal>
  )
}
