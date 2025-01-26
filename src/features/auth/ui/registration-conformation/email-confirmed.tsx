import { PATH } from '@/shared/constants'
import { Button, Typography } from '@/shared/ui'
import Image from 'next/image'
import Link from 'next/link'

/*global IntlMessages*/
type Props = {
  translatedForm: IntlMessages['auth']['ResendConfirm']
}

export const EmailConfirmed = ({ translatedForm }: Props) => {
  return (
    <div className={'flex flex-col items-center'}>
      <Typography className={'mb-5'} variant={'h1'}>
        {translatedForm.form.congratulations}
      </Typography>
      <Typography variant={'regular16'}>{translatedForm.form.emailConfirmed}</Typography>
      <Button asChild className={'mt-14 mb-16'} variant={'primary'}>
        <Link href={PATH.SIGN_IN}>{translatedForm.form.signIn}</Link>
      </Button>
      <Image alt={'success image'} height={293} src={'/images/success.svg'} width={430} />
    </div>
  )
}
