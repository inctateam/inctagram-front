import EditOutline from '@/assets/icons/components/filled-outlined-pairs/EditOutline'
import TrashOutline from '@/assets/icons/components/filled-outlined-pairs/TrashOutline'
import { PublicPostsItems } from '@/features/home-page/types'
import { CommentItems } from '@/features/post-page/types'
import { Comments } from '@/features/post-page/ui/comments/comments'
import { CommentForm } from '@/features/post-page/ui/interactionBlock/commentForm/commentForm'
import { InteractionButtons } from '@/features/post-page/ui/interactionBlock/interactionButtonst/interactionButtons'
import { LikesList } from '@/features/post-page/ui/interactionBlock/likeList'
import { Avatar, Dialog, DialogBody, DialogHeader, Dropdown, Typography } from '@/shared/ui'
import Image from 'next/image'

import { Description } from '../postDescription'

type PostModalProps = {
  comments: CommentItems[]
  onOpenChange: (open: boolean) => void
  open: boolean
  post: PublicPostsItems
}

const PostModal = (props: PostModalProps) => {
  const { comments, onOpenChange, open, post } = props
  const {
    avatarOwner,
    avatarWhoLikes,
    createdAt,
    description,
    images,
    isLiked,
    likesCount,
    userName,
  } = post
  const {} = comments
  const isAuth = false
  //add items for user profile settings
  //add images slider and url[]
  const dropDownItems = [
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
          <Image alt={'Post Image'} layout={'fill'} objectFit={'cover'} src={images[0]?.url} />
        </div>
        <div className={'flex flex-col w-[490px]'}>
          <DialogHeader className={'flex justify-between'}>
            <div className={'flex justify-center items-center gap-3'}>
              <Avatar alt={'User Avatar'} size={9} src={avatarOwner} />
              <Typography as={'h3'} variant={'h3'}>
                {userName}
              </Typography>
            </div>
            {isAuth && <Dropdown className={'bg-dark-500'} items={dropDownItems} />}
          </DialogHeader>
          {/*<DialogBody*/}
          {/*  className={*/}
          {/*    'flex flex-1 pt-4 pb-5 px-6 border-b border-dark-100 overflow-y-scroll [&::-webkit-scrollbar]:hidden scrollbar-thin scrollbar-none max-h-80'*/}
          {/*  }*/}
          {/*>*/}
          <DialogBody
            className={
              'flex flex-col flex-1 pt-4 pb-5 px-6 border-b border-dark-100 overflow-y-scroll [&::-webkit-scrollbar]:hidden scrollbar-thin scrollbar-none max-h-80'
            }
          >
            <Description
              avatar={avatarOwner}
              createdAt={createdAt}
              description={description}
              userName={userName}
            />
            <Comments comments={comments} isAuth={isAuth} />
          </DialogBody>
          <div className={'flex flex-col pt-3 pb-2 px-6 gap-2 border-b border-dark-100 '}>
            {isAuth && <InteractionButtons isLiked={isLiked} />}
            <LikesList
              avatarWhoLikes={avatarWhoLikes}
              createdAt={createdAt}
              likesCount={likesCount}
            />
          </div>
          {isAuth && <CommentForm onSubmit={() => alert('submit comment')} />}
        </div>
      </div>
    </Dialog>
  )
}

export { PostModal }
