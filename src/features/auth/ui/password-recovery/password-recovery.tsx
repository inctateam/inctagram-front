import { Button, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

type PasswordRecoveryProps = {
  mt?: string
  resendEmail: (email: string) => void
  userEmail: string
}

const PasswordRecoveryForm = (props: PasswordRecoveryProps) => {
  const { mt = '6', resendEmail, userEmail } = props
  const onClickHandler = () => {
    if (userEmail) {
      resendEmail(userEmail!)
    }
  }

  return (
    <div className={cn('flex flex-col w-[474px] gap-7 mx-auto', `mt-${mt}`)}>
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
      <div className={'w-[474px] h-[352px] border-[1px] border-solid border-light-900'}>
        {/*<img alt={'time-management-image'} src={''} />*/}
      </div>
    </div>
  )
}

export { PasswordRecoveryForm }
