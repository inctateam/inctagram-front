import { LayoutContainer } from '@/layouts'
import { PATH } from '@/shared/constants'
import { TextLink } from '@/shared/ui'
import { cn } from '@/shared/utils'
import { LocaleSwitcher } from '@/widgets'
import { useTranslations } from 'next-intl'

export const Header = () => {
  const t = useTranslations('Header')

  return (
    <div
      className={cn(
        'sticky top-0 overflow-hidden',
        'w-full h-[59px] min-h-[59px]',
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

        {/* Remove later*/}
        <div className={'flex gap-5'}>
          <TextLink href={PATH.SIGN_UP}>{t('signUp')}</TextLink>
          <TextLink href={PATH.CONFIRM_EMAIL + '?token=983274981-27390128039-8213098-3459083495'}>
            {t('confirmEmail')}
          </TextLink>

          <TextLink href={PATH.SIGN_IN}>{t('signIn')}</TextLink>

          <TextLink href={PATH.PASSWORD_RECOVERY}>{t('passwordRecovery')}</TextLink>
          <TextLink href={PATH.PASSWORD_RESET + '?code=2348230-842084-23093482039-23492390'}>
            {t('resetPassword')}
          </TextLink>

          <TextLink href={PATH.TERMS_OF_SERVICE}>{t('terms')}</TextLink>
          <TextLink href={PATH.PRIVACY_POLICY}>{t('privacyPolicy')}</TextLink>
        </div>
        {/* Remove later*/}

        <LocaleSwitcher />
      </LayoutContainer>
    </div>
  )
}
