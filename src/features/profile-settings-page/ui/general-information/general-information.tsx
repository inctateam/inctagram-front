'use client'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { GetMyProfileResponse } from '@/features/profile-settings-page/types'
import {
  FormatedCity,
  FormatedCountry,
  fetchCities,
} from '@/features/profile-settings-page/ui/servises/fetchCountries'
import {
  GeneralInformationFormValues,
  GeneralInformationSchema,
} from '@/features/profile-settings-page/ui/utils/generalInformationSchema'
import {
  Avatar,
  Button,
  ControlledDatePickerSingle,
  ControlledTextField,
  ControlledTextarea,
  DatePickerSingle,
  Separator,
  Spinner,
} from '@/shared/ui'
import { ControlledSelect } from '@/shared/ui/controlled/controlled-select/controlled-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

type GeneralInformationProps = {
  countries: FormatedCountry[]
  onSubmitHandler: (data: GeneralInformationFormValues) => void
  profileInfo: GetMyProfileResponse
}
/*global IntlMessages*/
export type GeneralInformationSchemaType =
  IntlMessages['ProfileSettings']['GeneralInformation']['formErrors']

const GeneralInformation = (props: GeneralInformationProps) => {
  const { countries, onSubmitHandler, profileInfo } = props
  const { aboutMe, avatars, city, country, dateOfBirth, firstName, lastName, userName } =
    profileInfo

  const t = useTranslations('ProfileSettings.GeneralInformation')
  const tErrors = useTranslations('ProfileSettings.GeneralInformation.formErrors')

  const [cities, setCities] = useState<FormatedCity[] | null>(null)
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
    console.log('Загружаем города', cities)
    const getCities = async () => {
      if (!selectCountry) {
        return
      }
      const currentCountry = countries.find(c => c.value === selectCountry)

      try {
        if (currentCountry) {
          const fetchedCities = await fetchCities(currentCountry?.countryCode)

          setCities(fetchedCities)
        }
      } catch (error) {
        handleRequestError(error)
        setError('Error loading cities')
      }
    }

    getCities()
  }, [selectCountry])

  if (!profileInfo) {
    return <Spinner />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className={'flex gap-6 mt-9'}>
      <div className={'flex flex-col gap-6'}>
        <Avatar alt={'User avatar'} size={48} src={avatars[0].url} />
        <Button className={'text-[0.9rem]'} type={'button'} variant={'outline'}>
          Add a Profile Photo
        </Button>
      </div>
      <form className={'flex flex-col gap-6 w-full '} onSubmit={handleSubmit(onSubmitHandler)}>
        {/*<div className={'flex border-b border-dark-300 pb-6'}>*/}
        {/*<div className={'flex flex-col w-full gap-6'}>*/}
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
          className={'[&::-webkit-scrollbar]:hidden'}
          control={control}
          defaultValue={aboutMe ?? ''}
          label={t('aboutMe')}
          name={'aboutMe'}
        />
        {/*</div>*/}
        {/*</div>*/}
        <Separator />
        <div className={'flex flex-row-reverse'}>
          <Button disabled={!isValid} type={'submit'} variant={'outline'}>
            {t('saveChanges')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export { GeneralInformation }
