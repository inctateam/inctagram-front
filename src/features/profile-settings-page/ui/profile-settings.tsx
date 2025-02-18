'use client'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import { Tabs, Typography } from '@/shared/ui'

const ProfileSettings = () => {
  const tabs = [
    {
      content: <GeneralInformation />,
      disabled: false,
      isActive: true,
      isFocused: false,
      label: 'General information',
      value: 'General information',
      variant: 'primary',
    },
    {
      content: <Typography>Devices</Typography>,
      disabled: false,
      isActive: false,
      isFocused: false,
      label: 'Devices',
      value: 'Devices',
      variant: 'secondary',
    },
    {
      content: <Typography>Account Management</Typography>,
      disabled: false,
      isActive: false,
      isFocused: false,
      label: 'Account Management',
      value: 'Account Management',
      variant: 'secondary',
    },
    {
      content: <Typography>My payments</Typography>,
      disabled: false,
      isActive: false,
      isFocused: false,
      label: 'My payments',
      value: 'My payments',
      variant: 'secondary',
    },
  ]

  return <Tabs className={'flex justify-between'} full tabs={tabs} value={'General information'} />
}

ProfileSettings.displayName = ProfileSettings

export { ProfileSettings }
