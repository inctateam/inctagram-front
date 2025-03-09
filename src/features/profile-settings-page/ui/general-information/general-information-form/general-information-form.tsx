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
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

type GeneralInformationFormProps = {
  onSubmitHandler(data: GeneralInformationFormValues): Promise<void>
  profileInfo: GetMyProfileResponse
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
      city: profileInfo?.city || undefined,
      country: profileInfo?.country || undefined,
      firstName: profileInfo?.firstName || undefined,
      lastName: profileInfo?.lastName || undefined,
      userName: profileInfo?.userName || undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(GeneralInformationSchema(scheme)),
  })
  const currentCountry = watch('country')

  const onDateChange = (date: Date | undefined) => {
    if (!date) {
      return
    }

    const today = new Date()
    const thirteenYearsAgo = new Date()

    thirteenYearsAgo.setFullYear(today.getFullYear() - 13)

    const isOlderThan13 = date <= thirteenYearsAgo

    setCheckFullYears(!isOlderThan13 ? tErrors('dateOfBirth') : null)

    setValue('dateOfBirth', date)
  }

  useEffect(() => {
    if (!countries || !currentCountry) {
      return
    }
    const foundCountry = countries.find(c => c.value === currentCountry)

    setSelectedCountry(foundCountry)
    setValue('city', undefined)
  }, [currentCountry, countries, setValue])

  return (
    <div className={'flex flex-col'}>
      <div className={'flex gap-9'}>
        <div className={'flex flex-col gap-6'}>
          <AddAvatarSection avatars={profileInfo?.avatars} />
        </div>
        <form
          className={'flex flex-col mt-6  w-full'}
          id={'general-information-form'}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
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
                defaultValue={profileInfo?.dateOfBirth || undefined}
                error={!!checkFullYears}
                label={t('dateOfBirth')}
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
            <div className={'flex md:flex-row flex-col gap-6'}>
              <div className={'flex flex-col md:w-1/2 w-full'}>
                <ControlledSelect
                  className={'h-44'}
                  control={control}
                  disabled={isLoadingCountries}
                  label={t('selectYourCountry')}
                  name={'country'}
                  options={countries?.map(country => ({
                    id: country.id,
                    label: country.label,
                    value: country.value,
                  }))}
                  placeholder={'Select country'}
                />
              </div>
              <div className={'flex flex-col md:w-1/2 w-full'}>
                <ControlledSelect
                  className={'h-44'}
                  control={control}
                  disabled={isLoadingCities || !selectedCountry}
                  label={t('selectYourCity')}
                  name={'city'}
                  options={cities || []}
                  placeholder={'Select city'}
                />
              </div>
            </div>
            <ControlledTextarea
              autoResize={false}
              className={'h-20 max-h-20 [&::-webkit-scrollbar]:hidden'}
              control={control}
              defaultValue={profileInfo?.aboutMe || ''}
              error={!!errors.aboutMe?.message}
              helperText={errors.aboutMe?.message}
              label={t('aboutMe')}
              name={'aboutMe'}
            />
          </div>
        </form>
      </div>
      <Separator className={'my-6'} />
      <div className={'flex flex-row-reverse mb-[3rem]'}>
        <Button
          disabled={!isValid || !!checkFullYears}
          form={'general-information-form'}
          type={'submit'}
          variant={'outline'}
        >
          {t('saveChanges')}
        </Button>
      </div>
    </div>
  )
}
