'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { useUpdateProfileMutation } from '@/features/profile-settings-page/api'
import { GetMyProfileResponse, UpdateMyProfile } from '@/features/profile-settings-page/types'
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
} from '@/features/profile-settings-page/ui/servises/countriesAndCities.api'
import { FormatedCountry } from '@/features/profile-settings-page/ui/servises/types'
import {
  GeneralInformationFormValues,
  GeneralInformationSchema,
} from '@/features/profile-settings-page/ui/utils/generalInformationSchema'
import {
  Avatar,
  Button,
  ControlledTextField,
  ControlledTextarea,
  DatePickerSingle,
  ProgressBar,
  Separator,
} from '@/shared/ui'
import { ControlledSelect } from '@/shared/ui/controlled/controlled-select/controlled-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useGetProfileQuery } from '@/features/home-page/ui/user-profile/api/user-profile.api'
import { Button, ControlledTextField, DatePickerSingle, Select, Textarea } from '@/shared/ui'

import AddAvatarSection from './addAvatarSection'
type GeneralInformationProps = {
  profileInfo: GetMyProfileResponse
}
/*global IntlMessages*/
export type GeneralInformationSchemaType =
  IntlMessages['ProfileSettings']['GeneralInformation']['formErrors']

const GeneralInformation = (props: GeneralInformationProps) => {
  // const { control, handleSubmit } = useForm()
  // const { data: profileData } = useGetProfileQuery()
  // const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined)
  const { profileInfo } = props
  const { aboutMe, avatars, city, country, dateOfBirth, firstName, lastName, userName } =
    profileInfo

  const [selectedCountry, setSelectedCountry] = useState<FormatedCountry | undefined>()


  const [updateProfile] = useUpdateProfileMutation()
  const { data: countries, isLoading: isLoadingCountries } = useGetCountriesQuery()
  const { data: cities, isLoading: isLoadingCities } = useGetCitiesQuery(
    selectedCountry?.countryCode || '',
    {
      skip: !selectedCountry?.countryCode,
    }
  )

  const t = useTranslations('ProfileSettings.GeneralInformation')
  const tErrors = useTranslations('ProfileSettings.GeneralInformation.formErrors')

  const scheme = {
    aboutMeMaxLength: tErrors('aboutMeMaxLength'),
    minMaxFirstName: tErrors('minMaxFirstName'),
    minMaxLastName: tErrors('minMaxLastName'),
    minMaxUserName: tErrors('minMaxUserName'),
    requiredField: tErrors('requiredField'),
  }

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
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

  const selectCountry = watch('country')

  useEffect(() => {
    if (!countries || !selectCountry) {
      return
    }
    const foundCountry = countries.find(c => c.value === selectCountry)

    setSelectedCountry(foundCountry)
  }, [selectCountry, countries])

  // useEffect(() => {
	// if (profileData?.avatars[0]) {
	//   setAvatarSrc(profileData?.avatars[0].url)
	// }
  // }, [profileData])
  // const onSubmit = async () => {
	// alert('Submit')
  // }
  const onSubmitHandler = async (data: GeneralInformationFormValues) => {
    const formattedData: UpdateMyProfile = {
      aboutMe: data.aboutMe ?? null,
      city: data.city ?? null,
      country: data.country ?? null,
      dateOfBirth: data.dateOfBirth ? format(data.dateOfBirth, 'yyyy-MM-dd') : dateOfBirth,
      firstName: data.firstName,
      lastName: data.lastName,
      region: data.region ?? null,
      userName: data.userName,
    }

    try {
      await updateProfile(formattedData).unwrap()

      toast.success('Profile updated successfully!')
    } catch (error: unknown) {
      handleRequestError(error)
      throw new Error('Error updating profile:')
    }
  }

  if (isLoadingCountries || isLoadingCities) {
    return <ProgressBar />
  }

  if (!countries) {
    return <div>Error</div>
  }

  return (
    // <div className={'flex gap-6 mt-9'}>
    <form className={'flex flex-col py-6 w-full'} onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={'flex gap-6 mb-4'}>
        <div className={'flex flex-col gap-6'}>
		  <AddAvatarSection avatarSrc={avatarSrc} setAvatarSrc={setAvatarSrc} />
		  {/*<Avatar alt={'User avatar'} size={48} src={avatars[0].url} />*/}
          {/*<Button className={'text-[0.9rem]'} type={'button'} variant={'outline'}>*/}
          {/*  Add a Profile Photo*/}
          {/*</Button>*/}
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
            defaultValue={dateOfBirth}
            onDateSelect={date => setValue('dateOfBirth', date)}
          />
          <div className={'flex gap-6'}>
            <div className={'flex flex-col w-1/2'}>
              <ControlledSelect
                className={'h-44'}
                control={control}
                defaultValue={country ?? countries[0].value}
                label={t('selectYourCountry')}
                name={'country'}
                options={countries.map(country => ({
                  id: country.id,
                  label: country.label,
                  value: country.value,
                }))}
              />
            </div>
            <div className={'flex flex-col w-1/2'}>
              <ControlledSelect
                className={'h-44'}
                control={control}
                defaultValue={city}
                label={t('selectYourCity')}
                name={'city'}
                options={cities ?? []}
              />
            </div>
          </div>
          <ControlledTextarea
            className={'min-h-20 max-h-32 [&::-webkit-scrollbar]:hidden'}
            control={control}
            defaultValue={aboutMe ?? ''}
            label={t('aboutMe')}
            name={'aboutMe'}
          />
        </div>
      </div>
      <Separator />
      <div className={'flex flex-row-reverse mt-4'}>
        <Button disabled={!isValid} type={'submit'} variant={'outline'}>
          {t('saveChanges')}
        </Button>
      </div>
    </form>
    // </div>
  )
}

export { GeneralInformation }
