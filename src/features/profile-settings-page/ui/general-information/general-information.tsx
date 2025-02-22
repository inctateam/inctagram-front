import { useForm } from 'react-hook-form'

import { GetMyProfileResponse } from '@/features/profile-settings-page/types'
import {
  Avatar,
  Button,
  ControlledTextField,
  DatePickerSingle,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
type GeneralInformationProps = {
  profileInfo: GetMyProfileResponse
}
/*global IntlMessages*/
type GeneralInformationSchemaType =
  IntlMessages['ProfileSettings']['GeneralInformation']['formErrors']

const GeneralInformationSchema = ({ ...scheme }: GeneralInformationSchemaType) =>
  z.object({
    aboutMe: z.string().max(345, { message: scheme.aboutMeMaxLength }),
    city: z.string(),
    country: z.string(),
    dateOfBirth: z.string().date(),
    firstName: z.string().min(2, { message: scheme.requiredField }),
    lastName: z.string().min(2, { message: scheme.requiredField }),
    region: z.string(),
    userName: z.string().min(2, { message: scheme.requiredField }),
  })

type GeneralInformationFormValues = z.infer<ReturnType<typeof GeneralInformationSchema>>
const GeneralInformation = (props: GeneralInformationProps) => {
  const { profileInfo } = props
  const { aboutMe, avatars, city, country, dateOfBirth, firstName, lastName, userName } =
    profileInfo

  const t = useTranslations('ProfileSettings.GeneralInformation')
  const tErrors = useTranslations('ProfileSettings.GeneralInformation.formErrors')
  const scheme = {
    aboutMeMaxLength: tErrors('aboutMeMaxLength'),
    requiredField: tErrors('requiredField'),
  }
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<GeneralInformationFormValues>({
    defaultValues: {
      city,
      country,
      firstName,
      lastName,
      userName,
    },
    mode: 'onChange',
    resolver: zodResolver(GeneralInformationSchema(scheme)),
  })

  const onSubmit = handleSubmit(data => {
    console.log('submit', data)
    alert('Submit')
  })

  if (!profileInfo) {
    return <Spinner />
  }

  return (
    <form className={'flex flex-col w-full mt-6 gap-6'} onSubmit={onSubmit}>
      <div className={'flex gap-10 border-b border-dark-300 pb-6'}>
        <div className={'flex flex-col gap-6'}>
          <Avatar alt={'User avatar'} size={48} src={avatars[0].url} />
          <Button className={'text-[0.9rem]'} variant={'outline'}>
            Add a Profile Photo
          </Button>
        </div>
        <div className={'flex flex-col w-full gap-6'}>
          <ControlledTextField
            control={control}
            error={!!errors.userName?.message}
            helperText={errors.userName?.message}
            label={t('userName')}
            name={'userName'}
            placeholder={'Enter your user name'}
            required
          />
          <ControlledTextField
            control={control}
            error={!!errors.firstName?.message}
            helperText={errors.firstName?.message}
            label={t('firstName')}
            name={'firstName'}
            required
          />
          <ControlledTextField
            control={control}
            error={!!errors.lastName?.message}
            helperText={errors.lastName?.message}
            label={t('lastName')}
            name={'lastName'}
            required
          />
          <DatePickerSingle
            date={new Date(dateOfBirth)}
            label={t('dateOfBirth')}
            name={'dateOfBirth'}
          />
          <div className={'flex gap-6'}>
            <div className={'flex flex-col w-1/2'}>
              <Select defaultValue={city} label={t('selectYourCountry')} name={'country'}>
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
                <SelectItem key={'Belarus'} value={'Belarus'}>
                  Belarus
                </SelectItem>
                <SelectItem key={'France'} value={'France'}>
                  France
                </SelectItem>
              </Select>
            </div>
            <div className={'flex flex-col w-1/2'}>
              <Select defaultValue={city} label={t('selectYourCity')} name={'city'}>
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
                <SelectItem key={'Minsk'} value={'Minsk'}>
                  Minsk
                </SelectItem>
                <SelectItem key={'Grodno'} value={'Grodno'}>
                  Grodno
                </SelectItem>
                <SelectItem key={'Brest'} value={'Brest'}>
                  Brest
                </SelectItem>
              </Select>
            </div>
          </div>
          <Textarea
            className={'[&::-webkit-scrollbar]:hidden'}
            label={t('aboutMe')}
            name={'aboutMe'}
            value={aboutMe ?? ''}
          />
        </div>
      </div>
      <div className={'flex flex-row-reverse'}>
        <Button disabled={!isValid} type={'submit'} variant={'outline'}>
          {t('saveChanges')}
        </Button>
      </div>
    </form>
  )
}

export { GeneralInformation }
