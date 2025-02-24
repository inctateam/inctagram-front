import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUploadProfileAvatarMutation } from '@/features/home-page/ui/user-profile/api/user-profile.api'
import { Button, ControlledTextField, DatePickerSingle, Select, Textarea } from '@/shared/ui'

import AddAvatarSection from './addAvatarSection'

const GeneralInformation = () => {
  const { control, handleSubmit } = useForm()

  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)

  const [uploadProfileAvatar] = useUploadProfileAvatarMutation()
  const onSubmit = async () => {
    alert('Submit')
    if (photoToUpload) {
      try {
        await uploadProfileAvatar({ file: photoToUpload }).unwrap()
        //window.history.back()//возврат на профайл
      } catch (error) {
        console.error('Failed to upload avatar:', error)
      }
    }
  }

  return (
    // <div className={'flex gap-10 '}>
    <form className={'flex flex-col w-full mt-6 gap-6'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex gap-10 border-b border-dark-300 pb-6'}>
        <AddAvatarSection setPhotoToUpload={setPhotoToUpload} />
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
        <Button type={'submit'} variant={'outline'}>
          Save Changes
        </Button>
      </div>
    </form>
  )
}

export { GeneralInformation }
