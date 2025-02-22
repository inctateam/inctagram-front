import { useUploadProfileAvatarMutation } from '@/features/home-page/ui/user-profile/api/user-profile.api'
import { Button, Dialog, DialogHeaderTitle, ImageUploader } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import { useRef, useState } from 'react'

type Props = {
  onOpenChange: (open: boolean) => void
  open?: boolean
  onPhotoUploaded: () => void // Добавляем колбэк для обновления аватара
}
const AddProfilePhotoDialog = ({ onOpenChange, open, onPhotoUploaded }: Props) => {
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [uploadProfileAvatar] = useUploadProfileAvatarMutation()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const onCloseAddProfilePhoto = () => {
    onOpenChange(false)
    setPhotoToUpload(null)
    setPreviewSrc(null)
  }

  const handleFileSelect = () => {
    fileInputRef?.current?.click()
  }
  const handleFileChange = (file: File) => {
    setPhotoToUpload(file)
    setPreviewSrc(URL.createObjectURL(file))
  }
  const handleSendPhoto = () => {
    if (photoToUpload) {
      uploadProfileAvatar({ file: photoToUpload })
        .unwrap()
        .then(() => {
          onPhotoUploaded() // Вызываем колбэк для обновления аватара
          onCloseAddProfilePhoto()
        })
        .catch(() => {
          // Обработка ошибки
        })
    }
  }

  return (
    <div className={'w-full'}>
      <Dialog
        dialogContentProps={{ className: 'w-[492px] h-[564px]' }}
        onOpenChange={onCloseAddProfilePhoto}
        open={open}
      >
        <DialogHeaderTitle>Add a Profile Photo</DialogHeaderTitle>

        {!photoToUpload && (
          <div className={'flex flex-col justify-center items-center gap-14 mt-20'}>
            <ImageUploader fileInputRef={fileInputRef} setPhotoToUpload={handleFileChange} />
            <Button onClick={handleFileSelect}>Select from Computer</Button>
          </div>
        )}

        {previewSrc && (
         <div className="relative w-[332px] h-[340px] mt-7 mx-auto">
            <img
              src={previewSrc}
              className={'w-[332px] h-[340px] object-cover opacity-50'}
            />
            <img
              src={previewSrc}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[332px] h-[340px] object-cover rounded-full z-10"
            />
          </div>
        )}
        {photoToUpload && (
          <Button onClick={handleSendPhoto} className="mt-10 ml-[382px]">
            Send
          </Button>
        )}
      </Dialog>
    </div>
  )
}

export default AddProfilePhotoDialog
