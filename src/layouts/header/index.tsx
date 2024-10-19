import { LayoutContainer } from '@/layouts'
import { PATH } from '@/shared/constants'
import { TextLink } from '@/shared/ui'
import { cn } from '@/shared/utils'

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

          <TextLink href={PATH.SIGN_IN}>Sigh in</TextLink>

          <TextLink href={PATH.PASSWORD_RECOVERY}>Forgot password</TextLink>
          <TextLink href={PATH.PASSWORD_RESET}>Reset password</TextLink>

          <TextLink href={PATH.TERMS_OF_SERVICE}>Terms of service</TextLink>
          <TextLink href={PATH.PRIVACY_POLICY}>Privacy Policy</TextLink>
        </div>
        {/* Remove later*/}

        <span>Select language</span>
      </LayoutContainer>
    </div>
  )
}
