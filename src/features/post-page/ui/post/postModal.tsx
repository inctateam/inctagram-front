'use client'
import React from 'react'
import { createPortal } from 'react-dom'

import EditOutline from '@/assets/icons/components/filled-outlined-pairs/EditOutline'
import TrashOutline from '@/assets/icons/components/filled-outlined-pairs/TrashOutline'
import { usePublicPostCommentsQuery } from '@/features/home-page/api'
import { PublicPostItem } from '@/features/home-page/types'
import { Comments } from '@/features/post-page/ui/comments/comments'
import { CommentForm } from '@/features/post-page/ui/interactionBlock/commentForm/commentForm'
import { InteractionButtons } from '@/features/post-page/ui/interactionBlock/interactionButtonst/interactionButtons'
import { LikesList } from '@/features/post-page/ui/interactionBlock/likeList'
import { Avatar, Dialog, DialogBody, DialogHeader, Dropdown, Typography } from '@/shared/ui'

import { Description } from '../postDescription'

type PostModalProps = {
  children: React.ReactNode
  onOpenChange: (open: boolean) => void
  open?: boolean
  post: PublicPostItem
}

const PostModal = (props: PostModalProps) => {
  const { children, onOpenChange, open, post } = props
  const { avatarOwner, avatarWhoLikes, createdAt, description, id, isLiked, likesCount, userName } =
    post
  const { data: publicComments } = usePublicPostCommentsQuery({ postId: id })
  const isAuth = false
  const maxHeight = isAuth ? 20 : 27
  //add items for user profile settings
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

  // Возвращаем портал с модальным окном
  return createPortal(
    <Dialog closePosition={'outside'} onOpenChange={onOpenChange} open={open}>
      <div className={'flex w-[61rem] h-[35rem]'}>
        <div className={'flex w-1/2 h-full bg-light-700 relative'}>{children}</div>
        <div className={'flex flex-1 h-full flex-col w-1/2'}>
          <DialogHeader className={'flex justify-between'}>
            <div className={'flex justify-center items-center gap-3'}>
              <Avatar alt={'User Avatar'} size={9} src={avatarOwner} />
              <Typography as={'h3'} variant={'h3'}>
                {userName}
              </Typography>
            </div>
            {isAuth && <Dropdown className={'bg-dark-500'} items={dropDownItems} />}
          </DialogHeader>
          <DialogBody className={'flex flex-col h-full'}>
            <div
              className={`flex flex-col max-h-[${maxHeight}rem] overflow-y-auto px-6 pt-4 pb-5 flex-1 [&::-webkit-scrollbar]:hidden`}
            >
              <Description
                avatar={avatarOwner}
                createdAt={createdAt}
                description={description}
                userName={userName}
              />
              <Comments
                // comments={isAuth ? comments?.items || [] : publicComments?.items || []}
                comments={publicComments?.items || []}
                isAuth={isAuth}
              />
            </div>
            <div
              className={'flex flex-col gap-2 bg-dark-500 border-t border-dark-100 px-6 pt-3 pb-2'}
            >
              {isAuth && <InteractionButtons isLiked={isLiked} />}
              <LikesList
                avatarWhoLikes={avatarWhoLikes}
                createdAt={createdAt}
                likesCount={likesCount}
              />
              {isAuth && <CommentForm onSubmit={() => alert('submit comment')} />}
            </div>
          </DialogBody>
        </div>
      </div>
    </Dialog>,
    document.body // Здесь мы указываем, что хотим отрисовать в body
  )
}

PostModal.displayName = 'PostModal'

export { PostModal }
