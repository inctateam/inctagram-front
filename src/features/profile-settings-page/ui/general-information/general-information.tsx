'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import countriesData from '@/data/countries-cities.json'
import { useUpdateProfileMutation } from '@/features/profile-settings-page/api'
import { GetMyProfileResponse, UpdateMyProfile } from '@/features/profile-settings-page/types'
import {
  GeneralInformationFormValues,
  GeneralInformationSchema,
} from '@/features/profile-settings-page/ui/utils/generalInformationSchema'
import {
  CountriesData,
  loadCitiesForCountry,
} from '@/features/profile-settings-page/ui/utils/loadCitiesForCountry'
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
import { useLocale, useTranslations } from 'next-intl'

type CityOption = { label: string; value: string }
type CountryOption = { label: string; value: string }

type GeneralInformationProps = {
  profileInfo: GetMyProfileResponse
}
/*global IntlMessages*/
export type GeneralInformationSchemaType =
  IntlMessages['ProfileSettings']['GeneralInformation']['formErrors']

const GeneralInformation = (props: GeneralInformationProps) => {
  const { profileInfo } = props
  const { aboutMe, avatars, city, country, dateOfBirth, firstName, lastName, userName } =
    profileInfo
  const [updateProfile] = useUpdateProfileMutation()

  const [cities, setCities] = useState<CityOption[]>([])
  const [defaultCountry, setDefaultCountry] = useState<null | string>(country ?? null)

  const locale = useLocale() as 'en' | 'ru'
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

  const data: CountriesData = countriesData

  const countryOptions: CountryOption[] = Object.keys(data).map(countryKey => ({
    label: locale === 'ru' ? data[countryKey].ru : data[countryKey].en,
    value: countryKey, // Код страны как value
  }))

  const selectedCountry = watch('country') // Получаем код страны

  useEffect(() => {
    const countryKey = selectedCountry || defaultCountry

    if (countryKey) {
      loadCitiesForCountry(countryKey, locale, data, setCities)
    }
  }, [selectedCountry, defaultCountry])

  const onSubmitHandler = async (data: GeneralInformationFormValues) => {
    const formattedData: UpdateMyProfile = {
      aboutMe: data.aboutMe ?? null,
      city: data.city ?? null,
      country: data.country ?? null,
      dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString().split('T')[0] : null, // Преобразуем в строку
      firstName: data.firstName,
      lastName: data.lastName,
      region: data.region ?? null,
      userName: data.userName,
    }

    try {
      const res = await updateProfile(formattedData).unwrap()

      toast.success('Profile updated successfully!')
      console.log('res: ', res)
    } catch (e) {
      console.log('Error updating profile:', e)
      toast.error('Error updating profile')
    }
  }

  if (!profileInfo) {
    return <Spinner />
  }

  return (
    <form className={'flex flex-col w-full mt-6 gap-6'} onSubmit={handleSubmit(onSubmitHandler)}>
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
          <DatePickerSingle
            date={new Date(dateOfBirth)}
            label={t('dateOfBirth')}
            name={'dateOfBirth'}
          />
          <div className={'flex gap-6'}>
            <div className={'flex flex-col w-1/2'}>
              <ControlledSelect
                control={control}
                defaultValue={city ?? t('selectYourCountry')}
                label={t('selectYourCountry')}
                name={'country'}
                options={countryOptions}
              />
            </div>
            <div className={'flex flex-col w-1/2'}>
              <ControlledSelect
                control={control}
                defaultValue={city ?? t('selectYourCity')}
                label={t('selectYourCity')}
                name={'city'}
                options={cities}
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
