import { GetMyProfileResponse } from '@/features/profile-settings-page/types'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import { Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/shared/ui'
import { useTranslations } from 'next-intl'

type ProfileSettingsProps = {
  profileInfo: GetMyProfileResponse
}
const ProfileSettings = (props: ProfileSettingsProps) => {
  const { profileInfo } = props
  const t = useTranslations('ProfileSettings')

  return (
    <Tabs defaultValue={'General-information'}>
      <TabsList>
        <TabsTrigger value={'General-information'}>{t('generalInformation')}</TabsTrigger>
        <TabsTrigger value={'Devices'}>{t('devices')}</TabsTrigger>
        <TabsTrigger value={'Account-management'}>{t('accountManagement')}</TabsTrigger>
        <TabsTrigger value={'My-payments'}>{t('myPayments')}</TabsTrigger>
      </TabsList>

      <TabsContent value={'General-information'}>
        <GeneralInformation profileInfo={profileInfo} />
      </TabsContent>

      <TabsContent value={'Devices'}>
        <Typography>Devices</Typography>
      </TabsContent>

      <TabsContent value={'Account-management'}>
        <Typography>Account Management</Typography>
      </TabsContent>

      <TabsContent value={'My-payments'}>
        <Typography>My payments</Typography>
      </TabsContent>
    </Tabs>
  )
}

ProfileSettings.displayName = ProfileSettings

export { ProfileSettings }

// useEffect(() => {
//   console.log('Загрузка стран...')
//
//   const getCountries = async () => {
//     try {
//       const fetchedCountries = await fetchCountries()
//
//       setCountries(fetchedCountries)
//     } catch (error) {
//       handleRequestError(error)
//       throw new Error('Error loading countries')
//     }
//   }
//
//   getCountries()
// }, [])

// const tabs: TabItem[] = [
//   {
//     content: (
//       <GeneralInformation
//         countries={countries}
//         // onSubmitHandler={onSubmitHandler}
//         profileInfo={profileInfo}
//       />
//     ),
//     label: 'General information',
//     value: t('generalInformation'),
//   },
//   {
//     content: <Typography>Devices</Typography>,
//     label: 'Devices',
//     value: t('devices'),
//   },
//   {
//     content: <Typography>Account Management</Typography>,
//     label: 'Account Management',
//     value: t('accountManagement'),
//   },
//   {
//     content: <Typography>My payments</Typography>,
//     label: 'My payments',
//     value: t('myPayments'),
//   },
// ]
