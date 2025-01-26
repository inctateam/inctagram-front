import { PATH } from '@/shared/constants'
import { Button, Typography } from '@/shared/ui'
import Image from 'next/image'
import Link from 'next/link'

export const EmailConfirmed = () => {
  return (
    <div className={'flex flex-col items-center'}>
      <Typography className={'mb-5'} variant={'h1'}>
        Congratulations
      </Typography>
      <Typography variant={'regular16'}>Your email has been confirmed</Typography>
      <Button asChild className={'mt-14 mb-16'} variant={'primary'}>
        <Link href={PATH.SIGN_IN}>Sign In</Link>
      </Button>
      <Image alt={'expired image'} height={352} src={'/images/success.svg'} width={474} />
    </div>
  )
}
