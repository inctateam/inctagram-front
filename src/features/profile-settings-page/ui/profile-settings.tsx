import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { useUpdateProfileMutation } from '@/features/profile-settings-page/api'
import { GetMyProfileResponse, UpdateMyProfile } from '@/features/profile-settings-page/types'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import {
  FormatedCountry,
  fetchCountries,
} from '@/features/profile-settings-page/ui/servises/fetchCountries'
import { GeneralInformationFormValues } from '@/features/profile-settings-page/ui/utils/generalInformationSchema'
import { Spinner, TabItem, Tabs, Typography } from '@/shared/ui'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
type ProfileSettingsProps = {
  profileInfo: GetMyProfileResponse
}
const ProfileSettings = (props: ProfileSettingsProps) => {
  const { profileInfo } = props
  const t = useTranslations('ProfileSettings')
  const [updateProfile] = useUpdateProfileMutation()
  const [countries, setCountries] = useState<FormatedCountry[]>([])

  useEffect(() => {
    console.log('Загрузка стран...')

    const getCountries = async () => {
      try {
        const fetchedCountries = await fetchCountries()

        setCountries(fetchedCountries)
      } catch (error) {
        handleRequestError(error)
        throw new Error('Error loading countries')
      }
    }

    getCountries()
  }, [])
  const onSubmitHandler = async (data: GeneralInformationFormValues) => {
    const formattedData: UpdateMyProfile = {
      aboutMe: data.aboutMe ?? null,
      city: data.city ?? null,
      country: data.country ?? null,
      dateOfBirth: data.dateOfBirth ? format(data.dateOfBirth, 'yyyy-MM-dd') : null,
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
  const tabs: TabItem[] = [
    {
      content: (
        <GeneralInformation
          countries={countries}
          onSubmitHandler={onSubmitHandler}
          profileInfo={profileInfo}
        />
      ),
      label: 'General information',
      value: t('generalInformation'),
    },
    {
      content: <Typography>Devices</Typography>,
      label: 'Devices',
      value: t('devices'),
    },
    {
      content: <Typography>Account Management</Typography>,
      label: 'Account Management',
      value: t('accountManagement'),
    },
    {
      content: <Typography>My payments</Typography>,
      label: 'My payments',
      value: t('myPayments'),
    },
  ]

  if (!countries.length) {
    return <Spinner />
  }

  return <Tabs defaultValue={'General information'} tabs={tabs} />
}

ProfileSettings.displayName = ProfileSettings

export { ProfileSettings }
