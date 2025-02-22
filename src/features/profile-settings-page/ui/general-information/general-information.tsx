import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Avatar,
  Button,
  ControlledTextField,
  DatePickerSingle,
  Select,
  Textarea,
} from '@/shared/ui'

import AddProfilePhotoDialog from './addProfilePhotoDialog'

const GeneralInformation = () => {
  const { control, handleSubmit } = useForm()
  const [open, setOpen] = useState<boolean>(false)
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined)

  const onSubmit = () => {
    alert('Submit')
  }

  const handlePhotoUploaded = (newAvatarUrl: string) => {
    setOpen(false)
    setAvatarSrc(newAvatarUrl)
  }

  return (
    // <div className={'flex gap-10 '}>
    <form className={'flex flex-col w-full mt-6 gap-6'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex gap-10 border-b border-dark-300 pb-6'}>
        <div className={'flex flex-col gap-6'}>
          <Avatar alt={'User avatar'} size={48} src={avatarSrc} />
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
        <Button variant={'outline'}>Save Changes</Button>
      </div>
    </form>
  )
}

export { GeneralInformation }
