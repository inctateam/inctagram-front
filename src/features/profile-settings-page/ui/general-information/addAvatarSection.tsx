import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { CloseOutline } from '@/assets/icons'
import { AvatarResponseType } from '@/features/home-page/types'
import {
  useDeleteProfileAvatarMutation,
  useGetProfileQuery,
  useUploadProfileAvatarMutation,
} from '@/features/home-page/ui/user-profile/api/user-profile.api'
import {
  AlertDialog,
  Avatar,
  Button,
  CancelButton,
  ConfirmButton,
  ProgressBar,
  Spinner,
} from '@/shared/ui'

import AddProfilePhotoDialog from './addProfilePhotoDialog'

interface Props {
  avatars: AvatarResponseType[] | undefined
}
const AddAvatarSection = ({ avatars }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined)
  const { data: profileData } = useGetProfileQuery()
  const [deleteProfileAvatar, { isLoading: isDeleting }] = useDeleteProfileAvatarMutation()
  const [uploadProfileAvatar, { isLoading: isUploading }] = useUploadProfileAvatarMutation()
  const handlePhotoUploaded = (file: File) => {
    setPhotoToUpload(file) // Сохраняем файл для отправки на сервер
  }

  useEffect(() => {
    if (avatars?.[0]) {
      setAvatarSrc(avatars[0].url)
    }
  }, [avatars, profileData])
  const handleDeletePhoto = async () => {
    setPhotoToUpload(null)
    try {
      await deleteProfileAvatar().unwrap()
      setPhotoToUpload(null)
      setAvatarSrc(undefined)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Failed to delete avatar:', error)
      toast.error('Failed to delete avatar')
    }
  }

  const handleSendPhoto = async () => {
    if (photoToUpload) {
      setOpen(false)
      try {
        await uploadProfileAvatar({ file: photoToUpload }).unwrap()
        setPhotoToUpload(null) // Сбрасываем состояние после успешной загрузки
        setAvatarSrc(URL.createObjectURL(photoToUpload))
      } catch (error) {
        console.error('Failed to upload avatar:', error)
        toast.error('Failed to upload avatar')
      }
    }
  }

  if (isDeleting || isUploading) {
    return (
      <div className={'w-48'}>
        <Spinner />
      </div>
    )
  }
  if (!profileData) {
    return <ProgressBar />
  }

  return (
    <>
      <div className={'flex flex-col items-center mt-12'}>
        <div className={'relative mb-6'}>
          <Avatar
            alt={'User avatar'}
            height={avatars?.[0].height}
            size={48}
            src={avatarSrc}
            width={avatars?.[0].width}
          />
          {avatarSrc && (
            <div className={'absolute top-0 right-0  transform translate-y-1/2 -translate-x-1/2'}>
              <CloseOutline
                className={'w-6 h-6 rounded-full bg-red-500 cursor-pointer'}
                onClick={() => setIsDeleteDialogOpen(true)}
              />
            </div>
          )}
        </div>
        <AddProfilePhotoDialog
          onOpenChange={setOpen}
          onPhotoUploaded={handlePhotoUploaded}
          onSendPhoto={handleSendPhoto}
          open={open}
        />
        {/*{!avatarSrc ? (*/}
        <Button className={'text-[0.9rem] p-4'} onClick={() => setOpen(true)} variant={'outline'}>
          Add a Profile Photo
        </Button>
        {/*) : null}*/}
      </div>
      {/* Диалог подтверждения удаления фото аватара*/}
      <AlertDialog
        cancelButton={<CancelButton onClick={() => setIsDeleteDialogOpen(false)}>No</CancelButton>}
        confirmButton={<ConfirmButton onClick={handleDeletePhoto}>Yes</ConfirmButton>}
        description={'Are you sure you want to delete the photo?'}
        onOpenChange={setIsDeleteDialogOpen}
        open={isDeleteDialogOpen}
        title={'Delete Photo'}
      />
    </>
  )
}

export default AddAvatarSection
