'use client'
import { Button, Typography } from '@/shared/ui'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

type PasswordRecoveryProps = {
  resendEmail: (email: string) => void
  userEmail: string
}

const PasswordRecoveryFormExpired = (props: PasswordRecoveryProps) => {
  const { resendEmail, userEmail } = props

  const onClickHandler = () => {
    resendEmail(userEmail)
    //fix later!!!
    // if (userEmail) {
    //   resendEmail(userEmail)
    // }
  }
  const t = useTranslations('auth')

  return (
    <div className={'flex flex-col w-[474px] gap-7'}>
      <div className={'mx-auto text-center'}>
        <Typography as={'h2'} variant={'h1'}>
          {t('emailVerificationLinkExpired')}
        </Typography>
        <div className={'w-[294px] mx-auto mt-5'}>
          <Typography className={'break-words text-center'} variant={'regular16'}>
            {t('expiredLinkDescription')}
          </Typography>
        </div>
        <Button className={'w-full mt-5'} onClick={onClickHandler}>
          {t('resendLink')}
        </Button>
      </div>
      <div>
        <Image alt={'expired image'} height={352} src={'/images/expired.svg'} width={474} />
      </div>
    </div>
  )
}

export { PasswordRecoveryFormExpired }
