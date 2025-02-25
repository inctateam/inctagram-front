import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { GetMyProfileResponse } from '@/features/profile-settings-page/types'
import {
  FormatedCountry,
  fetchCities,
  fetchCountries,
} from '@/features/profile-settings-page/ui/servises/fetchCountries'
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

type GeneralInformationProps = {
  onSubmitHandler: (data: GeneralInformationFormValues) => void
  profileInfo: GetMyProfileResponse
}
/*global IntlMessages*/
export type GeneralInformationSchemaType =
  IntlMessages['ProfileSettings']['GeneralInformation']['formErrors']

const GeneralInformation = (props: GeneralInformationProps) => {
  const { onSubmitHandler, profileInfo } = props
  const { aboutMe, avatars, city, country, dateOfBirth, firstName, lastName, userName } =
    profileInfo

  const t = useTranslations('ProfileSettings.GeneralInformation')
  const tErrors = useTranslations('ProfileSettings.GeneralInformation.formErrors')
  const locale = useLocale() as 'en' | 'ru'

  // Стейт для хранения данных стран и городов
  const [countries, setCountries] = useState<FormatedCountry[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectCountry, setSelectCountry] = useState<FormatedCountry | null>(null)
  const [selectCity, setSelectCity] = useState<FormatedCountry | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

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

  // Загрузка данных о странах
  useEffect(() => {
    const getCountries = async () => {
      setLoading(true)
      try {
        const countries = await fetchCountries(locale) // передаем locale

        setCountries(countries)
      } catch (error) {
        handleRequestError(error)
        setError('Error loading countries')
      } finally {
        setLoading(false)
      }
    }

    getCountries()
  }, [locale])
  // Загрузка городов при изменении выбранной страны
  useEffect(() => {
    if (selectCountry?.countryCode) {
      const getCities = async () => {
        setLoading(true)
        try {
          const cities = await fetchCities(selectCountry) // передаем selectCountry

          if (cities) {
            setCities(cities)
          }
        } catch (error) {
          handleRequestError(error)
          setError('Error loading cities')
        } finally {
          setLoading(false)
        }
      }

      getCities()
    }
  }, [selectCountry])

  if (!profileInfo || loading) {
    return <Spinner />
  }

  if (error) {
    console.log(error)

    return <div>{error}</div>
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
                className={'h-44'}
                control={control}
                defaultValue={country ?? t('selectYourCountry')}
                label={t('selectYourCountry')}
                name={'country'}
                onValueChange={selectValue => {
                  const selected = countries.find(country => country.name === selectValue)

                  if (selected) {
                    setSelectCountry(selected)
                  }
                }}
                options={countries.map(country => ({
                  label: country.name,
                  value: country.name,
                }))}
              />
            </div>
            <div className={'flex flex-col w-1/2'}>
              <ControlledSelect
                className={'h-44'}
                control={control}
                defaultValue={city ?? t('selectYourCity')}
                label={t('selectYourCity')}
                name={'city'}
                options={cities.map(city => ({
                  label: city,
                  value: city,
                }))}
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
