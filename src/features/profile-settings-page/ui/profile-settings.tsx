'use client'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import { TabItem, Tabs, Typography } from '@/shared/ui'

const ProfileSettings = () => {
  const tabs: TabItem[] = [
    {
      content: <GeneralInformation />,
      label: 'General information',
      value: 'General information',
    },
    {
      content: <Typography>Devices</Typography>,
      label: 'Devices',
      value: 'Devices',
    },
    {
      content: <Typography>Account Management</Typography>,
      label: 'Account Management',
      value: 'Account Management',
    },
    {
      content: <Typography>My payments</Typography>,
      label: 'My payments',
      value: 'My payments',
    },
  ]

  return (
    <Tabs
      className={'flex justify-between'}
      defaultValue={'General information'}
      full
      tabs={tabs}
    />
  )
}

ProfileSettings.displayName = ProfileSettings

export { ProfileSettings }
