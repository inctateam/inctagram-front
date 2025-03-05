'use client'
import { useMeQuery } from '@/features/auth/api'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import { MyPayments } from '@/features/profile-settings-page/ui/my-payments'
import { ProgressBar, Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/shared/ui'
import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

const ProfileSettings = ({ params }: { params: { id: string } }) => {
  const t = useTranslations('ProfileSettings')
  const { id } = params

  const { data: me, isError: isMeError, isLoading: isMeLoading } = useMeQuery()

  if (isMeLoading) {
    return <ProgressBar />
  }
  if (isMeError) {
    return <div>Error! Something went wrong</div>
  }
  const userId = me?.userId
  const paramsUserId = Number(id)

  if (!userId) {
    redirect('/auth/sign-in')
  }

  if (userId && paramsUserId !== userId) {
    redirect(`/profile/${userId}/settings`)
  }

  return (
    <Tabs defaultValue={'General-information'}>
      <TabsList>
        <TabsTrigger value={'General-information'}>{t('generalInformation')}</TabsTrigger>
        <TabsTrigger value={'Devices'}>{t('devices')}</TabsTrigger>
        <TabsTrigger value={'Account-management'}>{t('accountManagement')}</TabsTrigger>
        <TabsTrigger value={'My-payments'}>{t('myPayments')}</TabsTrigger>
      </TabsList>

      <TabsContent value={'General-information'}>
        <GeneralInformation />
      </TabsContent>

      <TabsContent value={'Devices'}>
        <Typography>Devices</Typography>
      </TabsContent>

      <TabsContent value={'Account-management'}>
        <Typography>Account Management</Typography>
      </TabsContent>

      <TabsContent value={'My-payments'}>
        <MyPayments />
      </TabsContent>
    </Tabs>
  )
}

ProfileSettings.displayName = ProfileSettings

export { ProfileSettings }
