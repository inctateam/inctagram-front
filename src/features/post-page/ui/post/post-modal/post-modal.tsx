'use client'
import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'

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
import {
  Avatar,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Dropdown,
  Textarea,
  Typography,
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Description } from '../../postDescription'

type PostModalProps = {
  children: React.ReactNode
  onOpenChange: (open: boolean) => void
  open?: boolean
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
const createEditDescriptionSchema = z.object({
  description: z.string().max(500, 'Description must not exceed 500 characters'),
})

type EditDescriptionSchema = z.infer<typeof createEditDescriptionSchema>

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
  // Хуки для работы с формой
  const { handleSubmit, register } = useForm<EditDescriptionSchema>({
    defaultValues: {
      description: description, // Устанавливаем начальное значение
    },
    resolver: zodResolver(createEditDescriptionSchema),
  })

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
  const handleCloseEditPost = () => {
    setIsEditPost(false)
  }
  const handleActionDropdown = (label: string) => {
    // Логика для редактирования или удаления поста
    if (label === 'Edit post') {
      setIsEditPost(true) // Устанавливаем состояние, что редактирование активно
    } else if (label === 'Delete post') {
      console.log('Delete post')
    }
  }
  const onSubmit = (description: EditDescriptionSchema) => {
    console.log(description) // Полученные данные из формы
    setIsEditPost(false) // Закрываем модалку редактирования
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
                <div className={'flex justify-center items-center gap-3'}>
                  <Avatar
                    alt={'User Avatar'}
                    className={'block max-sm:hidden'}
                    size={9}
                    src={avatarOwner}
                  />
                  <Typography as={'h3'} variant={'h3'}>
                    {userName}
                  </Typography>
                </div>
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
        <Dialog closePosition={'inside'} onOpenChange={handleCloseEditPost} open={open}>
          <div className={'border border-dark-100'}>
            <div className={'flex items-center pl-6 h-[60px] border-b border-dark-100'}>
              <Typography variant={'h1'}>Edit Post</Typography>
            </div>
            <div
              className={
                'flex w-[61rem] h-[35rem] bg-dark-300 max-sm:flex-col max-sm:w-[20rem] max-sm:h-[37rem] z-[9999]'
              }
            >
              <div className={'flex w-1/2 h-full relative max-sm:h-1/2 max-sm:w-full'}>
                {children}
              </div>
              <form
                className={'m-6 flex flex-col flex-1 w-1/2 max-sm:w-full'}
                onSubmit={handleSubmit(onSubmit)} // Отправка формы
              >
                <div className={'flex flex-col items-start'}>
                  <div className={'mb-6 flex justify-center items-center gap-3'}>
                    <Avatar
                      alt={'User Avatar'}
                      className={'block max-sm:hidden'}
                      size={9}
                      src={avatarOwner}
                    />
                    <Typography as={'h3'} variant={'h3'}>
                      {userName}
                    </Typography>
                  </div>
                  <Textarea
                    autoResize
                    className={'bg-dark-500'}
                    label={'Add publication descriptions'}
                    minHeight={100}
                    {...register('description')} // Подключаем к react-hook-form
                    defaultValue={post.description} // Устанавливаем начальное значение
                  />
                </div>
                <div className={'h-full flex flex-col items-end justify-between'}>
                  <Typography className={'text-light-900 text-[12px]'}>
                    {post.description.length}/500
                  </Typography>
                  <Button type={'submit'} variant={'primary'}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      )}
    </>,
    document.body // Здесь мы указываем, что хотим отрисовать в body
  )
}

PostModal.displayName = 'PostModal'

export { PostModal }
