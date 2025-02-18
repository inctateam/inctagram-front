import { Avatar, Button, ScrollArea, Select, TextField, Textarea } from '@/shared/ui'

const GeneralInformation = () => {
  return (
    // <div className={'flex gap-10 '}>
    <form className={'flex flex-col w-full mt-6 gap-6'}>
      <div className={'flex gap-10'}>
        <div className={'flex flex-col gap-6'}>
          <Avatar alt={'User avatar'} size={48} />
          <Button className={'text-[0.9rem]'} variant={'outline'}>
            Add a Profile Photo
          </Button>
        </div>
        <div className={'flex flex-col w-full gap-6'}>
          <TextField
            label={'User name'}
            placeholder={'Enter your user name'}
            required
            type={'text'}
          />
          <TextField label={'First name'} required type={'text'} />
          <TextField label={'Last name'} required type={'text'} />
          <TextField label={'Date of birth'} type={'date'} />
          <div className={'flex gap-6'}>
            <div className={'flex flex-col w-1/2'}>
              <Select label={'Select your country'} />
            </div>
            <div className={'flex flex-col w-1/2'}>
              <Select label={'Select your city'} />
            </div>
          </div>
          <ScrollArea>
            <Textarea
              className={'[&::-webkit-scrollbar]:hidden'}
              label={'About me'}
              maxLength={345}
            />
          </ScrollArea>
        </div>
      </div>
      <div className={'flex flex-row-reverse'}>
        <Button variant={'outline'}>Save Changes</Button>
      </div>
    </form>
    // </div>
  )
}

export { GeneralInformation }
