'use client'
import { Dialog, DialogBody, DialogHeader, Typography } from '@/shared/ui'
import { useRouter } from 'next/navigation'

export default function Post({ params: { id } }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <Dialog closePosition={'inside'} onOpenChange={() => router.back()} open>
      <DialogHeader>
        <Typography variant={'h2'}>Post {id}</Typography>
      </DialogHeader>
      <DialogBody className={'p-6'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </DialogBody>
    </Dialog>
  )
}
