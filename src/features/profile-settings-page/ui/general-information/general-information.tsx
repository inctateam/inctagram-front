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
import { PATH } from '@/shared/constants'
import { Nullable } from '@/shared/types'
import {
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

import AddAvatarSection from './addAvatarSection'

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

  const [selectedCountry, setSelectedCountry] = useState<FormatedCountry | undefined>()
  const [checkFullYears, setCheckFullYears] = useState<Nullable<string>>(null)
  const [updateProfile] = useUpdateProfileMutation()
  const { data: countries, isLoading: isLoadingCountries } = useGetCountriesQuery()
  const { data: cities, isLoading: isLoadingCities } = useGetCitiesQuery(
    selectedCountry?.countryCode || '',
    {
      skip: !selectedCountry?.countryCode,
    }
  )

  const t = useTranslations('ProfileSettings.GeneralInformation')
  const tPrivacyPolicy = useTranslations('auth.SignUp')
  const tErrors = useTranslations('ProfileSettings.GeneralInformation.formErrors')

  const scheme = {
    aboutMeMaxLength: tErrors('aboutMeMaxLength'),
    dateOfBirth: tErrors('dateOfBirth'),
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

  const onDateChange = (date: Date | undefined) => {
    debugger
    if (!date) {
      return
    }

    const today = new Date()
    const thirteenYearsAgo = new Date()

    thirteenYearsAgo.setFullYear(today.getFullYear() - 13)

    const isOlderThan13 = date <= thirteenYearsAgo

    if (!isOlderThan13) {
      setCheckFullYears(tErrors('dateOfBirth'))
    } else {
      setCheckFullYears(null)
    }
    setValue('dateOfBirth', date)
    console.log(isOlderThan13 ? 'Возраст 13 лет или больше' : 'Меньше 13 лет')
  }

  if (isLoadingCountries || isLoadingCities) {
    return <ProgressBar />
  }

  if (!countries) {
    return <div>Error</div>
  }

  return (
    <form className={'flex flex-col py-6 w-full'} onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={'flex gap-6 mb-4'}>
        <div className={'flex flex-col gap-6'}>
          <AddAvatarSection avatars={avatars} />
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
          <div>
            <DatePickerSingle
              defaultValue={dateOfBirth}
              error={!!checkFullYears}
              onDateSelect={date => onDateChange(date)}
            />
            {checkFullYears && (
              <span className={'text-danger-500 text-xs'}>
                {checkFullYears}{' '}
                <a className={'underline'} href={PATH.PRIVACY_POLICY}>
                  {tPrivacyPolicy('privacyPolicy')}
                </a>
              </span>
            )}
          </div>
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
        <Button disabled={!isValid || !!checkFullYears} type={'submit'} variant={'outline'}>
          {t('saveChanges')}
        </Button>
      </div>
    </form>
  )
}

export { GeneralInformation }
