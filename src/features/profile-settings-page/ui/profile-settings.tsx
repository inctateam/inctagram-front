'use client'
import { useEffect } from 'react'

import { useGetProfileQuery } from '@/features/home-page/ui/user-profile/api/user-profile.api'
import { GeneralInformation } from '@/features/profile-settings-page/ui/general-information'
import { MyPayments } from '@/features/profile-settings-page/ui/my-payments'
import { PATH } from '@/shared/constants'
import { ProgressBar, Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/shared/ui'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useGetCurrentSubscriptionsQuery } from '../api/subscriptions.api'
import { AccountManagement } from './account-management'

export const ProfileSettings = () => {
  const t = useTranslations('ProfileSettings')
  const { data: profileInfo, isError, isFetching, isLoading } = useGetProfileQuery()
  const router = useRouter()
  const { data: currentSubscriptions } = useGetCurrentSubscriptionsQuery()
  const searchParams = useSearchParams()
  const currentSection = searchParams.get('section') || 'General-information'
  // Получаем accountType из localStorage или из URL
  const accountTypeFromStorage = localStorage.getItem('accountType')
  const accountTypeFromURL = searchParams.get('accountType')
  const accountTypeFromSubscriptions =
    (currentSubscriptions?.data?.length ?? 0) > 0 ? 'business' : 'personal'
  const accountType =
    accountTypeFromSubscriptions || accountTypeFromStorage || accountTypeFromURL || 'personal'

  function isAccountType(accountType: string): accountType is 'business' | 'personal' {
    return accountType === 'business' || accountType === 'personal'
  }

  useEffect(() => {
    const success = searchParams.get('success')
    const section = searchParams.get('section')

    const newSearchParams = new URLSearchParams(searchParams.toString())

    // Если есть success и нет section, переходим на Account-management
    if (success && !section) {
      newSearchParams.set('section', 'Account-management')
      router.replace(`?${newSearchParams.toString()}`)
    }
    // Если section отсутствует, устанавливаем General-information
    else if (!section) {
      newSearchParams.set('section', 'General-information')
      router.replace(`?${newSearchParams.toString()}`)
    }
    // Если section не Account-management, удаляем success и accountType
    else if (section !== 'Account-management') {
      newSearchParams.delete('success')
      newSearchParams.delete('accountType')
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

    // Удалить 'success' и 'accountType' параметр, если выбрана другая вкладка, кроме 'Account-management'
    if (value !== 'Account-management') {
      newSearchParams.delete('success')
      newSearchParams.delete('accountType')
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
        {isAccountType(accountType) ? <AccountManagement accountType={accountType} /> : null}
      </TabsContent>

      <TabsContent value={'My-payments'}>
        <MyPayments />
      </TabsContent>
    </Tabs>
  )
}
