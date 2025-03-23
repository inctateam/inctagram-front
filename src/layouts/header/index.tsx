'use client'

import { useMeQuery } from '@/features/auth/api'
import { Notifications } from '@/features/notifications/ui/notifications'
import { LayoutContainer } from '@/layouts'
import { PATH } from '@/shared/constants'
import { Button, LocaleSwitcher, ProgressBar, TextLink } from '@/shared/ui'
import { cn } from '@/shared/utils'
import { useTranslations } from 'next-intl'

type Props = {
  auth?: boolean
}

export const Header = ({ auth }: Props) => {
  const t = useTranslations('Header')
  const { data, isLoading } = useMeQuery()

  if (isLoading) {
    return <ProgressBar />
  }

  return (
    <div
      className={cn(
        'sticky top-0 overflow-hidden',
        'w-full h-[3.75rem] min-h-[3.75rem]',
        'border-b border-dark-300 border-solid bg-dark-700',
        'z-40'
      )}
    >
      <LayoutContainer className={'h-full flex items-center justify-between'}>
        <TextLink
          className={'text-2.5xl font-medium'}
          color={'regular'}
          href={PATH.ROOT}
          underline={false}
        >
          Inctagram
        </TextLink>
        <div className={'flex items-center justify-center gap-7'}>
          {data && (
            <div className={'mr-5'}>
              <Notifications />
            </div>
          )}
          <LocaleSwitcher />

          {!auth && !data && (
            <>
              <Button asChild className={'w-fit font-semibold'} variant={'text'}>
                <TextLink href={PATH.SIGN_IN} underline={false}>
                  {t('logIn')}
                </TextLink>
              </Button>
              <Button asChild className={'w-fit font-semibold'} variant={'primary'}>
                <TextLink href={PATH.SIGN_UP} underline={false}>
                  {t('signUp')}
                </TextLink>
              </Button>
            </>
          )}
        </div>
      </LayoutContainer>
    </div>
  )
}
