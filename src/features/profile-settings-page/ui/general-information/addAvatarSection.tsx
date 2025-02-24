import { useState } from 'react'

import { CloseOutline } from '@/assets/icons'
import { AlertDialog, Avatar, Button, CancelButton, ConfirmButton } from '@/shared/ui'

import AddProfilePhotoDialog from './addProfilePhotoDialog'

interface Props {
  setPhotoToUpload: (file: File | null) => void
}
const AddAvatarSection = ({ setPhotoToUpload }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false) // Состояние для диалога удаления

  const handlePhotoUploaded = (file: File) => {
    setPhotoToUpload(file) // Сохраняем файл для отправки на сервер
    setAvatarSrc(URL.createObjectURL(file)) // Показываем превью аватара
  }

  const handleDeletePhoto = () => {
    setAvatarSrc(undefined) // Удаляем фото
    setPhotoToUpload(null) // Сбрасываем файл
    setIsDeleteDialogOpen(false) // Закрываем диалог
  }

  return (
    <>
      <div className={'flex flex-col gap-6'}>
        <div className={'relative'}>
          <Avatar alt={'User avatar'} size={48} src={avatarSrc} />
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
          open={open}
        />
        <Button className={'text-[0.9rem]'} onClick={() => setOpen(true)} variant={'outline'}>
          Add a Profile Photo
        </Button>
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
