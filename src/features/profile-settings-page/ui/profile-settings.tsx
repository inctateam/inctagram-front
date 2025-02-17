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
    },
    {
      content: <Typography>Devices</Typography>,
      disabled: false,
      isActive: false,
      isFocused: false,
      label: 'Devices',
      value: 'Devices',
    },
    {
      content: <Typography>Account Management</Typography>,
      disabled: false,
      isActive: false,
      isFocused: false,
      label: 'Account Management',
      value: 'Account Management',
    },
    {
      content: <Typography>My payments</Typography>,
      disabled: false,
      isActive: false,
      isFocused: false,
      label: 'My payments',
      value: 'My payments',
    },
  ]

  return <Tabs className={'flex justify-between'} tabs={tabs} value={'General information'} />
}

export { ProfileSettings }
