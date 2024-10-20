import { LayoutContainer } from '@/layouts'
import { PATH } from '@/shared/constants'
import { TextLink } from '@/shared/ui'
import { cn } from '@/shared/utils'
import { LocaleSwitcher } from '@/widgets'

export const Header = () => {
  return (
    <div className={cn('sticky top-0', 'w-full h-[59px]', 'border-b border-dark-300 border-solid')}>
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
          <TextLink href={PATH.SIGN_UP}>Sigh up</TextLink>
          <TextLink href={PATH.CONFIRM_EMAIL + '?token=983274981-27390128039-8213098-3459083495'}>
            Confirm Email
          </TextLink>

          <TextLink href={PATH.SIGN_IN}>Sigh in</TextLink>

          <TextLink href={PATH.PASSWORD_RECOVERY}>Forgot password</TextLink>
          <TextLink href={PATH.PASSWORD_RESET + '?token=2348230-842084-23093482039-23492390'}>
            Reset password
          </TextLink>

          <TextLink href={PATH.TERMS_OF_SERVICE}>Terms of service</TextLink>
          <TextLink href={PATH.PRIVACY_POLICY}>Privacy Policy</TextLink>
        </div>
        {/* Remove later*/}

        <LocaleSwitcher />
      </LayoutContainer>
    </div>
  )
}
