'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { useResendConfirmationMutation } from '@/features/auth/api'
import { FieldErrorResponse } from '@/features/auth/types'
import { PATH } from '@/shared/constants'
import { AlertDialog, Button, ProgressBar, Typography } from '@/shared/ui'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

export const LinkExpired = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')

  const [resendConfirmation, { isLoading }] = useResendConfirmationMutation()

  const [modalOpen, setModalOpen] = useState(false)

  const onResendHandler = async () => {
    if (email && code) {
      try {
        await resendConfirmation({ baseUrl: 'https://localhost:3000/', email })
          .unwrap()
          .then(() => {
            setModalOpen(true)
          })
      } catch (error) {
        const fieldError = error as FieldErrorResponse

        if (fieldError.status === 400) {
          toast.error("Email isn't valid or already confirmed")
        } else {
          toast.error('Some error occurred')
        }
      }
    } else {
      toast.error('Bad link')
    }
  }

  return (
    <div className={'flex flex-col items-center'}>
      {isLoading && <ProgressBar />}
      <Typography className={'mb-5'} variant={'h1'}>
        Email verification link expired
      </Typography>
      <Typography className={'max-w-[300px] text-center mb-7'} variant={'regular16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Button className={'mt-6 mb-9'} onClick={onResendHandler} variant={'primary'}>
        Resend verification link
      </Button>
      <Image alt={'expired image'} height={352} src={'/images/expired.svg'} width={474} />
      <AlertDialog
        confirmButton={
          <Button onClick={() => router.push(PATH.SIGN_IN)} variant={'primary'}>
            OK
          </Button>
        }
        description={`We have sent a link to confirm your email to ${email}`}
        onOpenChange={setModalOpen}
        open={modalOpen}
        title={'Email sent'}
      />
    </div>
  )
}
