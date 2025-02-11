'use client'
import React from 'react'
import { createPortal } from 'react-dom'

import CopyOutline from '@/assets/icons/components/filled-outlined-pairs/CopyOutline'
import EditOutline from '@/assets/icons/components/filled-outlined-pairs/EditOutline'
import PersonAdd from '@/assets/icons/components/filled-outlined-pairs/PersonAdd'
import TrashOutline from '@/assets/icons/components/filled-outlined-pairs/TrashOutline'
import { useMeQuery } from '@/features/auth/api'
import { usePublicPostCommentsQuery } from '@/features/home-page/api'
import { PublicPostItem } from '@/features/home-page/types'
import { usePostCommentsQuery } from '@/features/post-page/api'
import { Comments } from '@/features/post-page/ui/comments/comments'
import { CommentForm } from '@/features/post-page/ui/interactionBlock/commentForm/commentForm'
import { InteractionButtons } from '@/features/post-page/ui/interactionBlock/interactionButtonst/interactionButtons'
import { LikesList } from '@/features/post-page/ui/interactionBlock/likeList'
import { Avatar, Dialog, DialogBody, DialogHeader, Dropdown, Typography } from '@/shared/ui'

import { Description } from '../postDescription'

type PostModalProps = {
  children: React.ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  post: PublicPostItem
}

const PostModal = (props: PostModalProps) => {
  const { children, onOpenChange, open, post } = props
  const { avatarOwner, avatarWhoLikes, createdAt, description, id, isLiked, likesCount, userName } =
    post
  const { data: publicComments } = usePublicPostCommentsQuery({ postId: id })
  const { data: privateComments } = usePostCommentsQuery({ postId: id })
  const { data: me } = useMeQuery()
  const comments = me?.userId ? privateComments : publicComments
  const myDropDown = [
    {
      icon: <EditOutline />,
      label: 'Edit post',
    },
    {
      icon: <TrashOutline />,
      label: 'Delete post',
    },
  ]
  const friendDropDown = [
    {
      icon: <PersonAdd />,
      label: 'Follow',
    },
    {
      icon: <CopyOutline />,
      label: 'Copy Link',
    },
  ]
  const dropDownItems = me?.userId === post?.ownerId ? myDropDown : friendDropDown

  // Возвращаем портал с модальным окном
  return createPortal(
    <Dialog closePosition={'outside'} onOpenChange={onOpenChange} open={open}>
      <div className={'flex w-[61rem] h-[35rem] bg-dark-300'}>
        <div className={'flex w-1/2 h-full relative'}>{children}</div>
        <div className={'flex flex-1 flex-col w-1/2 justify-between'}>
          <DialogHeader className={'flex justify-between'}>
            <div className={'flex justify-center items-center gap-3'}>
              <Avatar alt={'User Avatar'} size={9} src={avatarOwner} />
              <Typography as={'h3'} variant={'h3'}>
                {userName}
              </Typography>
            </div>
            {me?.userId && <Dropdown className={'bg-dark-500'} items={dropDownItems} />}
          </DialogHeader>
          <DialogBody className={'flex flex-col h-[31rem]'}>
            <div
              className={`flex flex-col overflow-y-auto px-6 pt-4 pb-5 flex-1 [&::-webkit-scrollbar]:hidden`}
            >
              <Description
                avatar={avatarOwner}
                createdAt={createdAt}
                description={description}
                userName={userName}
              />
              <Comments comments={comments?.items || []} isAuth={!!me?.userId} />
            </div>
            <div
              className={'flex flex-col gap-2 bg-dark-300 border-t border-dark-100 px-6 pt-3 pb-2'}
            >
              {me?.userId && <InteractionButtons isLiked={isLiked} />}
              <LikesList
                avatarWhoLikes={avatarWhoLikes}
                createdAt={createdAt}
                likesCount={likesCount}
              />
              {me?.userId && <CommentForm onSubmit={() => alert('submit comment')} />}
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
