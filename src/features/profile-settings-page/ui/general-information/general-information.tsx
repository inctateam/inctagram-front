'use client'
import { useForm } from 'react-hook-form'

import { GetMyProfileResponse } from '@/features/profile-settings-page/types'
import {
  Avatar,
  Button,
  ControlledTextField,
  ControlledTextarea,
  DatePickerSingle,
  Spinner,
} from '@/shared/ui'
import { ControlledSelect } from '@/shared/ui/controlled/controlled-select/controlled-select'
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
    aboutMe: z.string().max(345, { message: scheme.aboutMeMaxLength }).optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.date().optional(),
    firstName: z.string().min(2, { message: scheme.requiredField }),
    lastName: z.string().min(2, { message: scheme.requiredField }),
    region: z.string().optional(),
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

  const onSubmitHandler = (data: GeneralInformationFormValues) => {
    debugger
    console.log(data)
  }

  if (!profileInfo) {
    return <Spinner />
  }

  return (
    <form
      className={'flex flex-col w-full mt-6 gap-6'}
      onSubmit={handleSubmit(onSubmitHandler)}
      // onSubmit={handleSubmit(data => onSubmitHandler(data))}
    >
      <div className={'flex gap-10 border-b border-dark-300 pb-6'}>
        <div className={'flex flex-col gap-6'}>
          <Avatar alt={'User avatar'} size={48} src={avatars[0].url} />
          <Button className={'text-[0.9rem]'} type={'button'} variant={'outline'}>
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
          {/*<ControlledTextField*/}
          {/*  control={control}*/}
          {/*  label={t('dateOfBirth')}*/}
          {/*  name={'dateOfBirth'}*/}
          {/*  type={'date'}*/}
          {/*/>*/}
          <DatePickerSingle
            date={new Date(dateOfBirth)}
            label={t('dateOfBirth')}
            name={'dateOfBirth'}
          />
          <div className={'flex gap-6'}>
            <div className={'flex flex-col w-1/2'}>
              <ControlledSelect
                control={control}
                defaultValue={city}
                label={t('selectYourCountry')}
                name={'country'}
                options={[
                  { label: 'Belarus', value: 'Belarus' },
                  { label: 'France', value: 'France' },
                ]}
              />
            </div>
            <div className={'flex flex-col w-1/2'}>
              <ControlledSelect
                control={control}
                defaultValue={city}
                label={t('selectYourCity')}
                name={'city'}
                options={[
                  { label: 'Minsk', value: 'Minsk' },
                  { label: 'Grodno', value: 'Grodno' },
                ]}
              />
            </div>
          </div>
          <ControlledTextarea
            className={'[&::-webkit-scrollbar]:hidden'}
            control={control}
            defaultValue={aboutMe ?? ''}
            label={t('aboutMe')}
            name={'aboutMe'}
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
