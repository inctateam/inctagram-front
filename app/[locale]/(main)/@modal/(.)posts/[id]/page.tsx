'use client'
import { usePostQuery } from '@/features/post-page/api'
import { PostModal } from '@/features/post-page/ui/post'
import { ImageContent } from '@/shared/ui/image-content'
// import { Dialog, DialogBody, DialogHeader, Typography } from '@/shared/ui'
import { useRouter } from 'next/navigation'

export default function Post({ params: { id } }: { params: { id: string } }) {
  const router = useRouter()
  const { data: post } = usePostQuery({ postId: Number(id) })

  // if (isLoading) {
  //   return <ProgressBar />
  // }
  // if (isError) {
  //   toast.error('error')
  // }

  return (
    <PostModal onOpenChange={() => router.back()} open post={post!}>
      <ImageContent itemImages={post?.images || []} />
    </PostModal>

    // <Dialog closePosition={'inside'} onOpenChange={() => router.back()} open>
    //   <DialogHeader>
    //     <Typography variant={'h2'}>Post {id}</Typography>
    //   </DialogHeader>
    //   <DialogBody className={'p-6'}>
    //     Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    //   </DialogBody>
    // </Dialog>
  )
}
