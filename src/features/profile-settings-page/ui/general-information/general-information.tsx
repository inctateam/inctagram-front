'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import data from '@/data/countries-cities.json'
import { useUpdateProfileMutation } from '@/features/profile-settings-page/api'
import { GetMyProfileResponse, UpdateMyProfile } from '@/features/profile-settings-page/types'
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
  Spinner,
} from '@/shared/ui'
import { ControlledSelect } from '@/shared/ui/controlled/controlled-select/controlled-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
// Типизация данных
type City = {
  name_en: string
  name_ru: string
}

type Country = {
  cities: City[] // Массив городов для каждой страны
  code: string
  name_en: string
  name_ru: string
}

type Data = {
  countries: Country[]
}

type CountryOption = { label: string; value: string }
type CityOption = { label: string; value: string }

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

  // Состояния для городов
  const [cities, setCities] = useState<CityOption[]>([]) // Состояние для городов

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

  const countryOptions: CountryOption[] = data.countries.map(country => ({
    label: locale === 'ru' ? country.name_ru : country.name_en,
    value: country.code, // Используем код страны как значение
  }))

  // Функция для загрузки городов для выбранной страны
  const loadCitiesForCountry = (selectedCountryCode: string) => {
    const selectedCountry = data.countries.find(country => country.code === selectedCountryCode)

    if (selectedCountry && selectedCountry.cities) {
      const citiesFormatted = selectedCountry.cities.map(city => ({
        label: locale === 'ru' ? city.name_ru : city.name_en,
        value: locale === 'ru' ? city.name_ru : city.name_en,
      }))

      setCities(citiesFormatted)
    } else {
      setCities([]) // Если городов нет для выбранной страны
    }
  }
  const selectedCountry = watch('country') // Получаем код страны

  useEffect(() => {
    if (selectedCountry) {
      loadCitiesForCountry(selectedCountry) // Загружаем города по коду страны
    }
  }, [selectedCountry])
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
