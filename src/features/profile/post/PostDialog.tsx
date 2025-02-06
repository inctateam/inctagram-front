import EditOutline from '@/assets/icons/components/filled-outlined-pairs/EditOutline'
import TrashOutline from '@/assets/icons/components/filled-outlined-pairs/TrashOutline'
import { CommentForm } from '@/features/profile/post/CommentForm'
import { InteractionButtons } from '@/features/profile/post/InteractionButtons'
import { LikesList } from '@/features/profile/post/LikesList '
import { Comments } from '@/features/profile/post/comments/comments'
import { MoakComments, MoakPost, likesListData } from '@/features/profile/post/moakObj'
import { PostDescription } from '@/features/profile/post/postDescription'
import { Avatar, Dialog, DialogBody, DialogHeader, Dropdown, Typography } from '@/shared/ui'
import Image from 'next/image'

type PostDialogProps = {
  onOpenChange: (open: boolean) => void
  open: boolean
}

export type Post = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: PostImage[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

export type PostImage = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type Owner = {
  firstName: string
  lastName: string
}

const PostDialog = (props: PostDialogProps) => {
  const { onOpenChange, open } = props
  const { avatarOwner, createdAt, description, images, userName } = MoakPost
  const isAuth = false
  //add items for user profile settings
  const items = [
    {
      icon: <EditOutline />,
      label: 'Edit post',
    },
    {
      icon: <TrashOutline />,
      label: 'Delete post',
    },
  ]

  return (
    <Dialog closePosition={'outside'} onOpenChange={onOpenChange} open={open}>
      <div className={'flex w-[972px] h-[564px]'}>
        <div className={'w-[490px] h-full bg-light-700 relative'}>
          <Image alt={'Post Image'} layout={'fill'} objectFit={'cover'} src={images[0].url} />
        </div>
        <div className={'w-[490px]  pb-4 pt-3'}>
          <DialogHeader className={'flex justify-between'}>
            <div className={'flex justify-center items-center gap-3'}>
              <Avatar alt={'User Avatar'} size={9} src={avatarOwner} />
              <Typography as={'h3'} variant={'h3'}>
                {userName}
              </Typography>
            </div>
            {isAuth && <Dropdown className={'bg-dark-500'} items={items} />}
          </DialogHeader>
          {/*<div className={'w-full h-px bg-dark-100 my-4'} />*/}
          <DialogBody
            className={
              'pt-4 pb-5 px-6 border-b border-dark-100 overflow-y-scroll [&::-webkit-scrollbar]:hidden scrollbar-thin scrollbar-none max-h-80'
            }
          >
            <PostDescription
              avatar={avatarOwner}
              createdAt={createdAt}
              description={description}
              userName={userName}
            />
            <Comments items={MoakComments.items} />
          </DialogBody>
          <div className={'flex flex-col pt-3 pb-2 px-6 gap-2 border-b border-dark-100 '}>
            <InteractionButtons />
            <LikesList {...likesListData} />
          </div>
          {isAuth && <CommentForm onSubmit={() => {}} />}
        </div>
      </div>
    </Dialog>
  )
}

export { PostDialog }
