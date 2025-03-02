'use client'
import { ReactNode, useRef, useState } from 'react'
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
import { EditPost } from '@/features/post-page/ui/post/edit-post'
import { Dialog, DialogBody, DialogHeader, Dropdown } from '@/shared/ui'
import { AvatarBlock } from '@/shared/ui/avatar-block'

import { Description } from '../../postDescription'

type PostModalProps = {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  post: PublicPostItem
}
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
const PostModal = (props: PostModalProps) => {
  const { children, onOpenChange, open, post } = props
  const {
    avatarOwner,
    avatarWhoLikes,
    createdAt,
    description,
    id,
    isLiked,
    likesCount,
    ownerId,
    userName,
  } = post
  const [isEditPost, setIsEditPost] = useState(false) // Состояние для редактирования поста
  const { data: publicComments } = usePublicPostCommentsQuery({ postId: id })
  const { data: privateComments } = usePostCommentsQuery({ postId: id })
  const { data: me } = useMeQuery()
  const comments = me?.userId ? privateComments : publicComments
  const dropDownItems = me?.userId === post?.ownerId ? myDropDown : friendDropDown
  const currentUrl = useRef(window.location.href)

  if (open) {
    // Используем window.history.pushState для изменения URL без перезагрузки страницы
    window.history.pushState({}, '', `/profile/${ownerId}/${id}`)
  }

  const handleClosePostModal = () => {
    // Для возврата на прежний URL
    window.history.replaceState({}, '', currentUrl.current)
    /*    if (!isExpanded) {
      // Если разворачиваем описание — выбираем только текущее изображение
      setItemImages([item.images[selectedIndex]])
    } else {
      // Если скрываем описание — возвращаем весь массив
      setItemImages(item.images)
    }*/
    onOpenChange(true)
  }
  const handleActionDropdown = (label: string) => {
    // Логика для редактирования или удаления поста
    if (label === 'Edit post') {
      setIsEditPost(true) // Устанавливаем состояние, что редактирование активно
    } else if (label === 'Delete post') {
      console.log('Delete post')
    }
  }

  // Возвращаем портал с модальным окном
  return createPortal(
    <>
      {!isEditPost && (
        <Dialog closePosition={'outside'} onOpenChange={handleClosePostModal} open={open}>
          <div
            className={
              'flex w-[61rem] h-[35rem] bg-dark-300 border border-dark-100 max-sm:flex-col max-sm:w-[20rem] max-sm:h-[37rem]'
            }
          >
            <div className={'flex w-1/2 h-full relative max-sm:h-1/2 max-sm:w-full'}>
              {children}
            </div>
            <div className={'flex flex-1 flex-col w-1/2 justify-between max-sm:w-full'}>
              <DialogHeader className={'flex justify-between'}>
                <AvatarBlock avatarOwner={avatarOwner} ownerId={ownerId} userName={userName} />
                {me?.userId && (
                  <Dropdown
                    className={'bg-dark-500'}
                    items={dropDownItems}
                    onClick={handleActionDropdown}
                  />
                )}
              </DialogHeader>
              <DialogBody className={'flex flex-col h-[31rem] max-sm:h-[248px]'}>
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
                  className={
                    'flex flex-col gap-2 bg-dark-300 border-t border-dark-100 px-6 pt-3 pb-2'
                  }
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
        </Dialog>
      )}
      {isEditPost && (
        <EditPost
          avatarOwner={avatarOwner}
          description={description}
          id={id}
          onOpenChange={() => setIsEditPost(false)}
          open={open}
          ownerId={ownerId}
          userName={userName}
        >
          {children}
        </EditPost>
      )}
    </>,
    document.body // Здесь мы указываем, что хотим отрисовать в body
  )
}

PostModal.displayName = 'PostModal'

export { PostModal }
