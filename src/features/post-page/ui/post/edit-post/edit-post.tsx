'use client'
import React, { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useUploadDescriptionMutation } from '@/features/post-page/api'
import {
  AlertDialog,
  Button,
  CancelButton,
  ConfirmButton,
  Dialog,
  ProgressBar,
  Textarea,
  Typography,
} from '@/shared/ui'
import { AvatarBlock } from '@/shared/ui/avatar-block'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type Props = {
  avatarOwner: string
  children: ReactNode
  description: string
  id: number
  onDescriptionUpdate: (description: string) => void
  onOpenChangeEdit: (open: boolean) => void
  open: boolean
  ownerId: number
  userName: string
}

const createEditDescriptionSchema = z.object({
  description: z.string().max(500, 'Description must not exceed 500 characters'),
})

type EditDescriptionSchema = z.infer<typeof createEditDescriptionSchema>

export const EditPost = ({
  avatarOwner,
  children,
  description,
  id,
  onDescriptionUpdate,
  onOpenChangeEdit,
  open,
  ownerId,
  userName,
}: Props) => {
  // Состояние окна с предупреждением о закрытии
  const [isClosePost, setIsClosePost] = useState(false)
  // Состояние для текущего описания (для отслеживания длины)
  const [currentDescription, setCurrentDescription] = useState(description)
  const [error, setError] = useState<null | string>(null)
  // Хуки для работы с формой
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<EditDescriptionSchema>({
    defaultValues: {
      description: description, // Устанавливаем начальное значение
    },
    resolver: zodResolver(createEditDescriptionSchema),
  })
  const [uploadDescription, { isError, isLoading }] = useUploadDescriptionMutation()

  if (isError) {
    toast.error('The post has not been found')
  }

  if (isLoading) {
    return <ProgressBar />
  }

  const onSubmit = async (data: EditDescriptionSchema) => {
    try {
      await uploadDescription({ description: data.description, postId: id })
      // Обновление описания в родительском компоненте
      onDescriptionUpdate(data.description) // Передаем новое описание в родительский компонент
      onOpenChangeEdit(false) // Закрываем модалку редактирования
      toast.success('Description updated successfully')
    } catch (error) {
      console.error('Error updating description:', error)
    }
  }
  // Функция для обработки нажатия на Enter
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      // Проверка длины текста перед отправкой формы
      if (description.length > 500) {
        toast.error('Description must not exceed 500 characters')

        return
      }
      handleSubmit(onSubmit)() // Отправка формы
    }
  }
  // Функция для обработки изменения текста
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value

    setValue('description', newDescription) // Обновление значения в форме
    setCurrentDescription(newDescription) // Обновление состояния для отслеживания текста

    // Если количество символов больше 500, показываем ошибку
    if (newDescription.length > 500) {
      setError('Description must not exceed 500 characters')
    } else {
      // Если меньше, убираем ошибку
      setError(null)
    }
  }

  return (
    <Dialog closePosition={'inside'} onOpenChange={() => setIsClosePost(true)} open={open}>
      <div className={'border border-dark-100'}>
        <div className={'flex items-center pl-6 h-[4rem] border-b border-dark-100'}>
          <Typography variant={'h1'}>Edit Post</Typography>
        </div>
        <div
          className={
            'flex w-[61rem] h-[35rem] bg-dark-300 max-sm:flex-col max-sm:w-[20rem] max-sm:h-[37rem]'
          }
        >
          <div className={'flex w-1/2 h-full relative max-sm:h-1/2 max-sm:w-full'}>{children}</div>
          <form
            className={'m-6 flex flex-col flex-1 w-1/2 max-sm:w-full'}
            onSubmit={handleSubmit(onSubmit)} // Отправка формы
          >
            <div className={'flex flex-col items-start'}>
              <div className={'mb-6'}>
                <AvatarBlock avatarOwner={avatarOwner} ownerId={ownerId} userName={userName} />
              </div>
              <Textarea
                autoResize
                className={'bg-dark-500'}
                label={'Add publication descriptions'}
                minHeight={100}
                {...register('description')} // Подключаем к react-hook-form
                defaultValue={description} // Устанавливаем начальное значение
                error={!!error} // Проверяем, есть ли ошибка
                helperText={error || errors.description?.message} // Выводим сообщение об ошибке
                onChange={handleDescriptionChange} // Обрабатываем изменения текста
                onKeyDown={handleKeyDown} // Обработка нажатия клавиши
              />
            </div>
            <div className={'h-full flex flex-col items-end justify-between'}>
              <Typography className={'text-light-900 text-[12px]'}>
                {currentDescription.length}/500
              </Typography>
              <Button disabled={isLoading} type={'submit'} variant={'primary'}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <AlertDialog
        cancelButton={<CancelButton>No</CancelButton>}
        confirmButton={<ConfirmButton onClick={() => onOpenChangeEdit(true)}>Yes</ConfirmButton>}
        description={
          'Do you really want to close the edition of the publication? If you close changes won’t be saved'
        }
        onOpenChange={setIsClosePost}
        open={isClosePost}
        title={'Close Post'}
      />
    </Dialog>
  )
}
