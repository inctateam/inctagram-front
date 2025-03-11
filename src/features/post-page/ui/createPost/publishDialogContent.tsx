import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { useCreatePostMutation, useUploadImageForPostMutation } from '@/features/post-page/api'
import { CreatePostHeader } from '@/features/post-page/ui/createPost/createPostHeader'
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from '@/features/post-page/ui/createPost/createPostSlice'
import { useAppDispatch, useAppSelector } from '@/services'
import { Avatar, ControlledTextarea, DialogBody, TextLink } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const publishPostSchema = z.object({
  description: z
    .string({
      required_error: 'Description required',
    })
    .max(500),
})

type FormValues = z.infer<typeof publishPostSchema>

type CroppingDialogContentProps = {
  handleBack: () => void
  onPostPublished: () => void
}

export const PublishDialogContent = ({
  handleBack,
  onPostPublished,
}: CroppingDialogContentProps) => {
  const [createPost] = useCreatePostMutation()
  const [uploadPhoto] = useUploadImageForPostMutation()

  const images = useAppSelector(createPostSliceSelectors.selectImages)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(publishPostSchema) })

  const dispatch = useAppDispatch()

  const onSubmitHandler = async ({ description }: FormValues) => {
    const uploadIds = [] as string[]

    for (let i = 0; i < images.length; i++) {
      const res = await fetch(images[i])

      if (!res.ok) {
        toast.error('Failed to load image')
      }
      const blob = await res.blob()
      const file = new File([blob], `postImage${i + 1}.png`, { type: 'image/png' })

      await uploadPhoto({ file })
        .unwrap()
        .then(res => {
          uploadIds.push(res.images[0].uploadId)
        })
    }

    createPost({
      description,
      uploadIds,
    })
      .unwrap()
      .then(() => {
        onPostPublished()
        images.forEach(image => URL.revokeObjectURL(image))
        dispatch(createPostSliceActions.setImages({ images: [] }))
      })
      .catch((error: unknown) => {
        handleRequestError(error, setError, ['childrenMetadata'])
      })
  }

  return (
    <div className={'w-[972px] h-[564px] flex flex-col'}>
      <CreatePostHeader handleBack={handleBack} publish title={'Publication'} />
      <DialogBody className={'flex flex-grow'}>
        <div className={'w-1/2 h-full flex'}>
          <ImageContent itemImages={images}></ImageContent>
        </div>
        <div className={'w-1/2 h-full flex flex-col pt-6 px-6 pb-10'}>
          <div className={'flex items-center gap-3 pb-6'}>
            <Avatar alt={'avatar'} size={9} />{' '}
            <TextLink
              className={'hover:underline'}
              color={'regular'}
              href={'/profile/3'}
              size={'large'}
              underline={false}
            >
              ProfileUrl
            </TextLink>
          </div>
          <form id={'publish-form'} onSubmit={handleSubmit(onSubmitHandler)}>
            <ControlledTextarea
              className={'h-[200px] resize-none bg-dark-500'}
              control={control}
              error={!!errors.description}
              helperText={errors.description?.message}
              label={'Введите описание для вашей публикации'}
              name={'description'}
            />
          </form>
        </div>
      </DialogBody>
    </div>
  )
}
