import { toast } from 'react-toastify'

import { useUpdateProfileMutation } from '@/features/profile-settings-page/api'
import { GetMyProfileResponse, UpdateMyProfile } from '@/features/profile-settings-page/types'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import { GeneralInformationFormValues } from '@/features/profile-settings-page/ui/utils/generalInformationSchema'
import { TabItem, Tabs, Typography } from '@/shared/ui'
import { useTranslations } from 'next-intl'
type ProfileSettingsProps = {
  profileInfo: GetMyProfileResponse
}
const ProfileSettings = (props: ProfileSettingsProps) => {
  const { profileInfo } = props
  const t = useTranslations('ProfileSettings')
  const [updateProfile] = useUpdateProfileMutation()

  const onSubmitHandler = async (data: GeneralInformationFormValues) => {
    console.log('GeneralInformationData:__', data)
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
  const tabs: TabItem[] = [
    {
      content: <GeneralInformation onSubmitHandler={onSubmitHandler} profileInfo={profileInfo} />,
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

  return <Tabs defaultValue={'General information'} tabs={tabs} />
}

ProfileSettings.displayName = ProfileSettings

export { ProfileSettings }
