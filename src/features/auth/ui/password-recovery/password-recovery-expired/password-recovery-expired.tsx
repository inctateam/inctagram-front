'use client'
import { Button, Typography } from '@/shared/ui'
import Image from 'next/image'

type PasswordRecoveryProps = {
  resendEmail: (email: string) => void
  userEmail: string
}

const PasswordRecoveryFormExpired = (props: PasswordRecoveryProps) => {
  const { resendEmail, userEmail } = props
  const onClickHandler = () => {
    if (userEmail) {
      resendEmail(userEmail!)
    }
  }

  return (
    <div className={'flex flex-col w-[474px] gap-7'}>
      <div className={'mx-auto'}>
        <Typography as={'h2'} variant={'h1'}>
          Email verification link expired
        </Typography>
        <div className={'w-[294px] mt-5'}>
          <Typography className={'break-words text-center'} variant={'regular16'}>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </Typography>
        </div>
        <Button className={'w-full mt-5'} onClick={onClickHandler}>
          Resend link
        </Button>
      </div>
      <div>
        <Image alt={'expired image'} height={352} src={'/images/expired.svg'} width={474} />
      </div>
    </div>
  )
}

export { PasswordRecoveryFormExpired }
