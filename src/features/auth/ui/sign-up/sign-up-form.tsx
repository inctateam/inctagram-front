'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { GithubLogo, GoogleLogo } from '@/assets/icons'
import { useSignupMutation } from '@/features/auth/api'
import { EmailSentModal } from '@/features/auth/ui'
import { PATH } from '@/shared/constants'
import {
  Button,
  Card,
  ControlledCheckbox,
  ControlledPasswordTextField,
  ControlledTextField,
  FormHelperText,
  FormLabel,
  IconButton,
  TextLink,
  Typography,
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signUpSchema = z
  .object({
    agreesToTerms: z.literal(true, {
      errorMap: () => ({ message: 'You have to agree our terms and conditions' }),
    }),
    email: z.string().email({ message: 'The email must match the format example@example.com' }),
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])/,
        'Password must contain a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    passwordConfirmation: z.string(),
    username: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30')
      .refine(value => value !== 'Username', 'User with this username is already registered'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'The passwords must match',
    path: ['passwordConfirmation'],
  })

type SignUpFields = z.infer<typeof signUpSchema>

export function SignUpForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFields>({
    mode: 'onBlur', // Валидация при потере фокуса
    resolver: zodResolver(signUpSchema),
  })
  const [signup, { isLoading }] = useSignupMutation()

  const [userEmail, setUserEmail] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = handleSubmit(data => {
    setUserEmail(data.email)
    //setModalOpen(true)
    signup({
      email: data.email,
      password: data.password,
      username: data.username,
    })
      .unwrap()
      .then(() => {
        setModalOpen(true)
        setErrorMessage('')
      })
      .catch(error => {
        console.log(error)
        setModalOpen(false)
        if (error.status === 400 && error.data.errorsMessages === 'existed_email') {
          toast.error('User with this email is already registered')
        }
        if (error.status === 400 && error.data.errorsMessages === 'existed_login') {
          toast.error('User with this username is already registered')
        } else {
          toast.error(error.data.errorsMessages)
        }
      })
  })

  return (
    <>
      <Card className={'w-[378px]'} variant={'auth'}>
        <Typography className={'text-center'} variant={'h1'}>
          Sign Up
        </Typography>

        <div className={'flex w-full justify-center space-x-[60px] mt-3 mb-6'}>
          <IconButton asChild className={'text-4xl'} size={'base'}>
            <a href={'https://google.com'} rel={'noreferrer'} target={'_blank'}>
              <GoogleLogo />
            </a>
          </IconButton>
          <IconButton className={'text-4xl'} size={'base'}>
            <GithubLogo />
          </IconButton>
        </div>

        <form className={'flex flex-col space-y-4 w-full'} onSubmit={onSubmit}>
          <ControlledTextField
            control={control}
            error={!!errors?.username?.message}
            helperText={errors?.username?.message}
            label={<FormLabel required>Username</FormLabel>}
            name={'username'}
            placeholder={'Epam11'}
          />
          <ControlledTextField
            control={control}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
            label={<FormLabel required>Email</FormLabel>}
            name={'email'}
            placeholder={'Epam@epam.com'}
          />
          <ControlledPasswordTextField
            control={control}
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
            label={<FormLabel required>Password</FormLabel>}
            name={'password'}
            placeholder={'******************'}
          />

          <ControlledPasswordTextField
            control={control}
            error={!!errors?.passwordConfirmation?.message}
            helperText={errors?.passwordConfirmation?.message}
            label={<FormLabel required>Password confirmation</FormLabel>}
            name={'passwordConfirmation'}
            placeholder={'******************'}
          />
          <ControlledCheckbox
            control={control}
            label={
              <div className={'flex items-center'}>
                <Typography variant={'small'}>{'I agree to the '}</Typography>
                <span className={'mx-1'}>
                  <TextLink
                    className={'mb-1'}
                    color={'primary'}
                    href={PATH.TERMS_OF_SERVICE}
                    size={'small'}
                  >
                    Terms of service
                  </TextLink>
                </span>
                <Typography variant={'small'}> and </Typography>
                <span className={'mx-1'}>
                  <TextLink
                    className={'mb-1'}
                    color={'primary'}
                    href={PATH.PRIVACY_POLICY}
                    size={'small'}
                    underline
                  >
                    Privacy policy
                  </TextLink>
                </span>
              </div>
            }
            name={'agreesToTerms'}
          />
          {errors.agreesToTerms && (
            <FormHelperText error>{errors.agreesToTerms.message}</FormHelperText>
          )}
          {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
          <Button className={'w-full'} disabled={isLoading} type={'submit'}>
            Sign up
          </Button>
          <Typography className={'text-center'} variant={'regular16'}>
            Do you have an account?
          </Typography>
          <TextLink
            className={'text-base font-semibold hover:text-accent-300 hover:underline'}
            href={PATH.SIGN_IN}
            underline={false}
          >
            Sign In
          </TextLink>
        </form>
      </Card>

      <EmailSentModal
        onOpenChange={open => setModalOpen(open)}
        open={modalOpen}
        userEmail={userEmail}
      />
    </>
  )
}
