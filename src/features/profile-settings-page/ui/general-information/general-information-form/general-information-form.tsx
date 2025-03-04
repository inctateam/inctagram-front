import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { GetMyProfileResponse } from '@/features/profile-settings-page/types'
import AddAvatarSection from '@/features/profile-settings-page/ui/general-information/addAvatarSection'
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
  ControlledSelect,
  ControlledTextField,
  ControlledTextarea,
  DatePickerSingle,
  Separator,
  Spinner,
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

type GeneralInformationFormProps = {
  onSubmitHandler(data: GeneralInformationFormValues): Promise<void>
  profileInfo: GetMyProfileResponse | undefined
}
/*global IntlMessages*/
export type GeneralInformationSchemaType =
  IntlMessages['ProfileSettings']['GeneralInformation']['formErrors']

export const GeneralInformationForm = (props: GeneralInformationFormProps) => {
  const { onSubmitHandler, profileInfo } = props
  const [selectedCountry, setSelectedCountry] = useState<FormatedCountry | undefined>()
  const [checkFullYears, setCheckFullYears] = useState<Nullable<string>>(null)
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
      city: profileInfo?.city,
      country: profileInfo?.country,
      firstName: profileInfo?.firstName,
      lastName: profileInfo?.lastName,
      userName: profileInfo?.userName,
    },
    mode: 'onChange',
    resolver: zodResolver(GeneralInformationSchema(scheme)),
  })
  const selectCountry = watch('country')
  const onDateChange = (date: Date | undefined) => {
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
  }

  useEffect(() => {
    if (!countries || !selectCountry) {
      return
    }
    const foundCountry = countries.find(c => c.value === selectCountry)

    setSelectedCountry(foundCountry)
  }, [selectCountry, countries])

  if (isLoadingCountries || isLoadingCities) {
    return <Spinner />
  }

  return (
    <form className={'flex flex-col py-6 w-full'} onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={'flex gap-6 mb-4'}>
        <div className={'flex flex-col gap-6'}>
          <AddAvatarSection avatars={profileInfo?.avatars} />
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
              defaultValue={profileInfo?.dateOfBirth}
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
                defaultValue={profileInfo?.country ?? 'Select your country'}
                label={t('selectYourCountry')}
                name={'country'}
                options={countries?.map(country => ({
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
                defaultValue={profileInfo?.city ?? 'Select your city'}
                label={t('selectYourCity')}
                name={'city'}
                options={cities ?? []}
              />
            </div>
          </div>
          <ControlledTextarea
            className={'min-h-20 max-h-32 [&::-webkit-scrollbar]:hidden'}
            control={control}
            defaultValue={profileInfo?.aboutMe ?? ''}
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
