import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { GetUserProfileResponse } from '@/features/home-page/ui/user-profile/types/user-profile.types'
import AddAvatarSection from '@/features/profile-settings-page/ui/general-information/addAvatarSection'
import { useGetCitiesQuery } from '@/features/profile-settings-page/ui/servises/countriesAndCities.api'
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
  ProgressBar,
  Separator,
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

type GeneralInformationFormProps = {
  countries: FormatedCountry[]
  onSubmitHandler(data: GeneralInformationFormValues): Promise<void>
  profileInfo: GetUserProfileResponse
}
/*global IntlMessages*/
export type GeneralInformationSchemaType =
  IntlMessages['ProfileSettings']['GeneralInformation']['formErrors']

export const GeneralInformationForm = (props: GeneralInformationFormProps) => {
  const { countries, onSubmitHandler, profileInfo } = props
  const [selectedCountry, setSelectedCountry] = useState<FormatedCountry | undefined>()
  const [checkFullYears, setCheckFullYears] = useState<Nullable<string>>(null)
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

  const defaultValues = useMemo(
    () => ({
      city: profileInfo?.city || undefined,
      country: profileInfo?.country || undefined,
      firstName: profileInfo?.firstName || undefined,
      lastName: profileInfo?.lastName || undefined,
      userName: profileInfo?.userName || undefined,
    }),
    [profileInfo]
  )

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm<GeneralInformationFormValues>({
    defaultValues,
    // defaultValues: {
    //   city: profileInfo?.city || undefined,
    //   country: profileInfo?.country || undefined,
    //   firstName: profileInfo?.firstName || undefined,
    //   lastName: profileInfo?.lastName || undefined,
    //   userName: profileInfo?.userName || undefined,
    // },
    mode: 'onChange',
    resolver: zodResolver(GeneralInformationSchema(scheme)),
  })
  const currentCountry = watch('country')

  useEffect(() => {
    if (profileInfo?.city) {
      setValue('city', profileInfo.city) // предотвращает лишние ререндеры
    }
  }, [profileInfo?.city, setValue])

  useEffect(() => {
    if (!countries || !currentCountry) {
      return
    }

    const foundCountry = countries.find(c => c.value === currentCountry)

    if (foundCountry?.value !== selectedCountry?.value) {
      setSelectedCountry(foundCountry)
      setValue('city', undefined)
    }
  }, [currentCountry, countries, setValue, selectedCountry?.value])

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

  if (!profileInfo || isLoadingCities || !countries) {
    return <ProgressBar />
  }

  return (
    <div className={'flex flex-col'}>
      <div className={'flex gap-9'}>
        <div className={'flex flex-col gap-6'}>
          <AddAvatarSection avatars={profileInfo?.avatars} />
        </div>
        <form
          className={'flex flex-col mt-6 gap-6 w-full'}
          id={'general-information-form'}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
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
                label={t('selectYourCountry')}
                name={'country'}
                options={countries || []}
                placeholder={'Select country'}
              />
            </div>
            <div className={'flex flex-col md:w-1/2 w-full'}>
              <ControlledSelect
                className={'h-44'}
                control={control}
                disabled={isLoadingCities}
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
