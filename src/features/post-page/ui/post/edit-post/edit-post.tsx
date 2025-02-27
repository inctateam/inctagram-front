'use client'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useUploadDescriptionMutation } from '@/features/post-page/api'
import { Button, Dialog, ProgressBar, Textarea, Typography } from '@/shared/ui'
import { AvatarBlock } from '@/shared/ui/avatar-block'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type Props = {
  avatarOwner: string
  children: ReactNode
  description: string
  id: number
  onOpenChange: (open: boolean) => void
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
  onOpenChange,
  open,
  ownerId,
  userName,
}: Props) => {
  // Хуки для работы с формой
  const { handleSubmit, register } = useForm<EditDescriptionSchema>({
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
      onOpenChange(false) // Закрываем модалку редактирования
      toast.success('Description updated successfully')
    } catch (error) {
      console.error('Error updating description:', error)
    }
  }

  return (
    <Dialog closePosition={'inside'} onOpenChange={onOpenChange} open={open}>
      <div className={'border border-dark-100'}>
        <div className={'flex items-center pl-6 h-[60px] border-b border-dark-100'}>
          <Typography variant={'h1'}>Edit Post</Typography>
        </div>
        <div
          className={
            'flex w-[61rem] h-[35rem] bg-dark-300 max-sm:flex-col max-sm:w-[20rem] max-sm:h-[37rem] z-[9999]'
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
              />
            </div>
            <div className={'h-full flex flex-col items-end justify-between'}>
              <Typography className={'text-light-900 text-[12px]'}>
                {description.length}/500
              </Typography>
              <Button disabled={isLoading} type={'submit'} variant={'primary'}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  )
}
