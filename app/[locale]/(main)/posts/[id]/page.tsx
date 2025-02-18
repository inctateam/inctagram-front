export default function Posts({ params: { id } }: { params: { id: string } }) {
  return <div>Post {id}</div>
}
// 'use client'
// import { usePostQuery } from '@/features/post-page/api'
// import { PostModal } from '@/features/post-page/ui/post'
// import { ProgressBar } from '@/shared/ui'
// import { ImageContent } from '@/shared/ui/image-content'
// import { useRouter } from 'next/navigation'
//
// export default function Posts({ params: { id } }: { params: { id: string } }) {
//   const router = useRouter()
//   const { data: post, isLoading } = usePostQuery({ postId: +id })
//
//   if (isLoading) {
//     return <ProgressBar />
//   }
//
//   return (
//     <PostModal onOpenChange={() => router.back()} open post={post!}>
//       <ImageContent itemImages={post?.images || []} />
//     </PostModal>
//   )
// }
