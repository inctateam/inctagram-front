'use client'
import { toast } from 'react-toastify'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { useUpdateProfileMutation } from '@/features/profile-settings-page/api'
import { GetMyProfileResponse, UpdateMyProfile } from '@/features/profile-settings-page/types'
import { GeneralInformationForm } from '@/features/profile-settings-page/ui/general-information/general-information-form/general-information-form'
import { GeneralInformationFormValues } from '@/features/profile-settings-page/ui/utils/generalInformationSchema'
import { format } from 'date-fns'

type Props = {
  profileInfo: GetMyProfileResponse
}
const GeneralInformation = ({ profileInfo }: Props) => {
  const [updateProfile] = useUpdateProfileMutation()

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

  if (profileInfo) {
    return <GeneralInformationForm onSubmitHandler={onSubmitHandler} profileInfo={profileInfo} />
  }
}

export { GeneralInformation }
