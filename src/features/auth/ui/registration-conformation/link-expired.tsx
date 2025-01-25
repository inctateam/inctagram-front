import React from 'react'

import { Button, TextField, Typography } from '@/shared/ui'
import Image from 'next/image'

export const LinkExpired = () => {
  return (
    <div className={'flex flex-col items-center'}>
      <Typography className={'mb-5'} variant={'h1'}>
        Email verification link expired
      </Typography>
      <Typography className={'max-w-[300px] text-center mb-7'} variant={'regular16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <div>
        <TextField label={'Email'} name={'email'} placeholder={'Epam@epam.com'} />
      </div>
      <Button className={'mt-6 mb-9'} variant={'primary'}>
        Resend verification link
      </Button>
      <Image alt={'expired image'} height={352} src={'/images/expired.svg'} width={474} />
    </div>
  )
}
