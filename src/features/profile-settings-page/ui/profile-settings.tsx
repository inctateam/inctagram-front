'use client'
import { useGetMyProfileQuery } from '@/features/profile-settings-page/api'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import { MyPayments } from '@/features/profile-settings-page/ui/my-payments'
import { PATH } from '@/shared/constants'
import { ProgressBar, Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/shared/ui'
import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

import AccountManagement from './account-management/account-management'

export const ProfileSettings = () => {
  const t = useTranslations('ProfileSettings')
  const { data: profileInfo, isError, isFetching, isLoading } = useGetMyProfileQuery()

  if (isLoading || isFetching) {
    return <ProgressBar />
  }
  if (isError || !profileInfo) {
    redirect(PATH.SIGN_IN)
  }

  return (
    <Tabs className={'mt-3'} defaultValue={'General-information'}>
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
        <AccountManagement />
      </TabsContent>

      <TabsContent value={'My-payments'}>
        <MyPayments />
      </TabsContent>
    </Tabs>
  )
}
