export default function Posts({ params: { id } }: { params: { id: string } }) {
  return <div>Post {id}</div>
}
// 'use client'
// import { useState } from 'react'
//
// import { usePostQuery } from '@/features/post-page/api'
// import { PostModal } from '@/features/post-page/ui/post'
// import { ImageContent } from '@/shared/ui/image-content'
//
// export default function Posts({ params: { id } }: { params: { id: string } }) {
//   const [open, setOpen] = useState(true)
//   const { data: post } = usePostQuery({ postId: Number(id) })
//
//   return (
//     <div>
//       <div
//         className={'flex cursor-pointer border-2 border-dark-100'}
//         onClick={() => setOpen(!open)}
//       >
//         Post {id}
//       </div>
//       {open && post && (
//         <PostModal onOpenChange={() => setOpen(!open)} open={open} post={post}>
//           <ImageContent itemImages={post.images} />
//         </PostModal>
//       )}
//     </div>
//   )
// }
