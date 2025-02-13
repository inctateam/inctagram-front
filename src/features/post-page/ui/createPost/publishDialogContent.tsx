import { useForm } from 'react-hook-form'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { useCreatePostMutation } from '@/features/post-page/api'
import { Image } from '@/features/post-page/types'
import { CreatePostHeader } from '@/features/post-page/ui/createPost/createPostHeader'
import { Avatar, ControlledTextarea, DialogBody, TextLink } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
  handleNext: () => void
  images: Image[]
}

export const PublishDialogContent = ({
  handleBack,
  handleNext,
  images,
}: CroppingDialogContentProps) => {
  const [createPost] = useCreatePostMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(publishPostSchema) })

  const router = useRouter()

  const uploadIds = images.map(image => image.uploadId)

  const onSubmitHandler = async ({ description }: FormValues) => {
    createPost({
      description,
      uploadIds,
    })
      .unwrap()
      .then(() => {
        router.push('/test')
      })
      .catch((error: unknown) => {
        handleRequestError(error, setError, ['childrenMetadata'])
      })
  }

  return (
    <div className={'w-[972px] h-[564px] flex flex-col'}>
      <CreatePostHeader
        handleBack={handleBack}
        handleNext={handleNext}
        publish
        title={'Publication'}
      />
      <DialogBody className={'flex flex-grow'}>
        <div className={'w-1/2 h-full'}>
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
              autoResize={false}
              className={'h-[120px] resize-none'}
              control={control}
              error={!!errors.description}
              helperText={errors.description?.message}
              label={'Введите описание для вашей публикации'}
              minHeight={120}
              name={'description'}
            />
          </form>
        </div>
      </DialogBody>
    </div>
  )
}
