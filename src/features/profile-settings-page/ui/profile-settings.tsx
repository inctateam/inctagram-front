'use client'
import { useEffect } from 'react'

import { useGetProfileQuery } from '@/features/home-page/ui/user-profile/api/user-profile.api'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import { MyPayments } from '@/features/profile-settings-page/ui/my-payments'
import { PATH } from '@/shared/constants'
import { ProgressBar, Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/shared/ui'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { AccountManagement } from './account-management'

export const ProfileSettings = () => {
  const t = useTranslations('ProfileSettings')
  const { data: profileInfo, isError, isFetching, isLoading } = useGetProfileQuery()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSection = searchParams.get('section') || 'General-information'

  useEffect(() => {
    const success = searchParams.get('success')

    if (success && !searchParams.get('section')) {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      newSearchParams.set('section', 'Account-management')
      router.replace(`?${newSearchParams.toString()}`)
    } else if (!searchParams.get('section')) {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      newSearchParams.set('section', 'General-information')
      router.replace(`?${newSearchParams.toString()}`)
    }
  }, [router, searchParams])

  if (isLoading || isFetching) {
    return <ProgressBar />
  }
  if (isError || !profileInfo) {
    redirect(PATH.SIGN_IN)
  }
  const handleSectionChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    newSearchParams.set('section', value)

    // Удалить 'success' параметр, если выбрана другая вкладка, кроме 'Account-management'
    if (value !== 'Account-management') {
      newSearchParams.delete('success')
    }

    router.replace(`?${newSearchParams.toString()}`)
  }

  return (
    <Tabs
      className={'mt-3'}
      defaultValue={'General-information'}
      onValueChange={handleSectionChange}
      value={currentSection}
    >
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
