import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useMeQuery } from '@/features/auth/api'
import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { useGetPublicUserProfileQuery } from '@/features/home-page/ui/user-profile/api/user-profile.api'
import { useCreatePostMutation, useUploadImageForPostMutation } from '@/features/post-page/api'
import { CreatePostStages } from '@/features/post-page/ui/createPost/createPostDialog'
import { CreatePostHeader } from '@/features/post-page/ui/createPost/createPostHeader'
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from '@/features/post-page/ui/createPost/createPostSlice'
import { useAppDispatch, useAppSelector } from '@/services'
import { Avatar, ControlledTextarea, DialogBody, Spinner, TextLink } from '@/shared/ui'
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
  onPostPublished: () => void
  setStage: (stage: CreatePostStages) => void
}

export const PublishDialogContent = ({ onPostPublished, setStage }: CroppingDialogContentProps) => {
  const [createPost] = useCreatePostMutation()
  const [uploadPhoto] = useUploadImageForPostMutation()

  const images = useAppSelector(createPostSliceSelectors.selectImages)

  const { data: authData } = useMeQuery()

  const { data: profileData, isLoading: profileIsLoading } = useGetPublicUserProfileQuery(
    authData!.userId,
    {
      skip: authData?.userId === undefined,
    }
  )

  let profileAvatarUrl = undefined

  if (profileData?.avatars && profileData?.avatars.length > 0) {
    if (profileData?.avatars[0].url) {
      profileAvatarUrl = profileData?.avatars[0].url
    }
  }

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
      <CreatePostHeader
        handleBack={() => setStage(CreatePostStages.Filtering)}
        publish
        title={'Publication'}
      />
      <DialogBody className={'flex flex-grow'}>
        <div className={'w-1/2 h-full flex'}>
          <ImageContent itemImages={images}></ImageContent>
        </div>
        <div className={'w-1/2 h-full flex flex-col pt-6 px-6 pb-10'}>
          {!profileIsLoading ? (
            <div>
              <TextLink
                className={'hover:underline pb-6'}
                color={'regular'}
                href={`/profile/${JSON.stringify(authData?.userId)}`}
                size={'large'}
                target={'_blank'}
                underline={false}
              >
                <Avatar alt={'avatar'} className={'mr-3'} size={9} src={profileAvatarUrl} />
                {profileData?.userName}
              </TextLink>
            </div>
          ) : (
            <div>
              <Spinner />
            </div>
          )}

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
