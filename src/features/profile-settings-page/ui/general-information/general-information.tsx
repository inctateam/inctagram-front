'use client'
import { toast } from 'react-toastify'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { useUpdateProfileMutation } from '@/features/home-page/ui/user-profile/api/user-profile.api'
import {
  GetUserProfileResponse,
  UpdateMyProfile,
} from '@/features/home-page/ui/user-profile/types/user-profile.types'
import { GeneralInformationForm } from '@/features/profile-settings-page/ui/general-information/general-information-form/general-information-form'
import { useGetCountriesQuery } from '@/features/profile-settings-page/ui/servises/countriesAndCities.api'
import { GeneralInformationFormValues } from '@/features/profile-settings-page/ui/utils/generalInformationSchema'
import { ProgressBar } from '@/shared/ui'
import { format } from 'date-fns'

type Props = {
  profileInfo: GetUserProfileResponse
}
const GeneralInformation = ({ profileInfo }: Props) => {
  const [updateProfile] = useUpdateProfileMutation()
  const { data: countries, isLoading: isLoadingCountries } = useGetCountriesQuery()

  const onSubmitHandler = async (data: GeneralInformationFormValues) => {
    const formattedData: UpdateMyProfile = {
      aboutMe: data.aboutMe || null,
      city: data.city || null,
      country: data.country || null,
      dateOfBirth: data.dateOfBirth
        ? format(data.dateOfBirth, 'yyyy-MM-dd')
        : profileInfo?.dateOfBirth || null,
      firstName: data.firstName,
      lastName: data.lastName,
      region: data.region || null,
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

  if (!profileInfo || isLoadingCountries) {
    return <ProgressBar />
  }

  return (
    <GeneralInformationForm
      countries={countries || []}
      onSubmitHandler={onSubmitHandler}
      profileInfo={profileInfo}
    />
  )
}

export { GeneralInformation }
