import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  AlertDialog,
  Avatar,
  Button,
  CancelButton,
  ConfirmButton,
  ControlledTextField,
  DatePickerSingle,
  Select,
  Textarea,
} from '@/shared/ui'

import AddProfilePhotoDialog from './addProfilePhotoDialog'
import { useUploadProfileAvatarMutation } from '@/features/home-page/ui/user-profile/api/user-profile.api'
import { CloseOutline } from '@/assets/icons'

const GeneralInformation = () => {
  const { control, handleSubmit, setValue } = useForm()
  const [open, setOpen] = useState<boolean>(false)
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined)
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false) // Состояние для диалога удаления

  const [uploadProfileAvatar] = useUploadProfileAvatarMutation()
  const onSubmit = async () => {
    alert('Submit')
    if (photoToUpload) {
      try {
        const response = await uploadProfileAvatar({ file: photoToUpload }).unwrap()
        setAvatarSrc(response.avatars[0].url) // Обновляем аватар после успешной загрузки
        setValue('avatar', response.avatars[0].url)
        window.history.back()
      } catch (error) {
        console.error('Failed to upload avatar:', error)
      }
    }
  }

  const handlePhotoUploaded = (file: File) => {
    setPhotoToUpload(file) // Сохраняем файл для отправки на сервер
    setAvatarSrc(URL.createObjectURL(file)) // Показываем превью аватара
  }

  const handleDeletePhoto = () => {
    setAvatarSrc(undefined) // Удаляем фото
    setPhotoToUpload(null) // Сбрасываем файл
    setValue('avatar', '') // Сбрасываем значение поля формы
    setIsDeleteDialogOpen(false) // Закрываем диалог
  }

  return (
    // <div className={'flex gap-10 '}>
    <form className={'flex flex-col w-full mt-6 gap-6'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex gap-10 border-b border-dark-300 pb-6'}>
        <div className={'flex flex-col gap-6'}>
          <div className="relative">
            <Avatar alt={'User avatar'} size={48} src={avatarSrc} />
            {avatarSrc && (
              <div className="absolute top-0 right-0  transform translate-y-1/2 -translate-x-1/2">
                <CloseOutline
                  className="w-6 h-6 rounded-full bg-red-500 cursor-pointer"
                  onClick={() => setIsDeleteDialogOpen(true)}
                />
              </div>
            )}
          </div>
          <AddProfilePhotoDialog
            onOpenChange={setOpen}
            open={open}
            onPhotoUploaded={handlePhotoUploaded}
          />
          <Button className={'text-[0.9rem]'} onClick={() => setOpen(true)} variant={'outline'}>
            Add a Profile Photo
          </Button>
        </div>
        <div className={'flex flex-col w-full gap-6'}>
          <ControlledTextField
            control={control}
            label={'User name'}
            name={'userName'}
            placeholder={'Enter your user name'}
            required
            type={'text'}
          />
          <ControlledTextField
            control={control}
            label={'First name'}
            name={'firstName'}
            required
            type={'text'}
          />
          <ControlledTextField
            control={control}
            label={'Last name'}
            name={'lastName'}
            required
            type={'text'}
          />
          <DatePickerSingle helperText={''} label={'Date of birth'} />
          <div className={'flex gap-6'}>
            <div className={'flex flex-col w-1/2'}>
              <Select label={'Select your country'} />
            </div>
            <div className={'flex flex-col w-1/2'}>
              <Select label={'Select your city'} />
            </div>
          </div>
          <Textarea
            className={'[&::-webkit-scrollbar]:hidden'}
            label={'About me'}
            maxLength={345}
          />
        </div>
      </div>
      <div className={'flex flex-row-reverse'}>
        <Button type="submit" variant={'outline'}>
          Save Changes
        </Button>
      </div>
      {/* Диалог подтверждения удаления фото аватара*/}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Photo"
        description="Are you sure you want to delete the photo?"
        confirmButton={<ConfirmButton onClick={handleDeletePhoto}>Yes</ConfirmButton>}
        cancelButton={<CancelButton onClick={() => setIsDeleteDialogOpen(false)}>No</CancelButton>}
      />
    </form>
  )
}

export { GeneralInformation }
