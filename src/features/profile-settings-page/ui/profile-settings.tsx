import { GetMyProfileResponse } from '@/features/profile-settings-page/types'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import { TabItem, Tabs, Typography } from '@/shared/ui'
import { useTranslations } from 'next-intl'
type ProfileSettingsProps = {
  profileInfo: GetMyProfileResponse
}
const ProfileSettings = (props: ProfileSettingsProps) => {
  const { profileInfo } = props
  const t = useTranslations('ProfileSettings')

  const tabs: TabItem[] = [
    {
      content: <GeneralInformation profileInfo={profileInfo} />,
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
