'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { useResendConfirmationMutation } from '@/features/auth/api'
import { FieldErrorResponse } from '@/features/auth/types'
import { PATH } from '@/shared/constants'
import { AlertDialog, Button, ProgressBar, Typography } from '@/shared/ui'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

/*global IntlMessages*/
type Props = {
  translatedForm: IntlMessages['auth']['ResendConfirm']
}

export const LinkExpired = ({ translatedForm }: Props) => {
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

        if (fieldError?.data.messages?.[0]?.message) {
          toast.error(
            `${translatedForm.errors.error} ${fieldError?.data.statusCode}: ${fieldError.data.messages?.[0]?.message}`
          )
        } else {
          toast.error(translatedForm.errors.someError)
        }
      }
    } else {
      toast.error(translatedForm.errors.badLink)
    }
  }

  return (
    <div className={'flex flex-col items-center'}>
      {isLoading && <ProgressBar />}
      <Typography className={'mb-5'} variant={'h1'}>
        {translatedForm.form.linkExpiredDescription1}
      </Typography>
      <Typography className={'max-w-[300px] text-center mb-7'} variant={'regular16'}>
        {translatedForm.form.linkExpiredDescription2}
      </Typography>
      <Button className={'mt-6 mb-9'} onClick={onResendHandler} variant={'primary'}>
        {translatedForm.form.resendLink}
      </Button>
      <Image alt={'expired image'} height={352} src={'/images/expired.svg'} width={474} />
      <AlertDialog
        confirmButton={
          <Button onClick={() => router.push(PATH.SIGN_IN)} variant={'primary'}>
            OK
          </Button>
        }
        description={`${translatedForm.form.emailSentDescription} ${email}`}
        onOpenChange={setModalOpen}
        open={modalOpen}
        title={translatedForm.form.emailSent}
      />
    </div>
  )
}
