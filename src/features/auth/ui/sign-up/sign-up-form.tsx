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
      .max(20, 'Maximum number of characters 20')
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

type Props = {
  translatedForm: Record<string, string>
}
export function SignUpForm({ translatedForm }: Props) {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<SignUpFields>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })
  const [signup, { isLoading }] = useSignupMutation()

  const [userEmail, setUserEmail] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [validatedFields, setValidatedFields] = useState({
    agreesToTerms: false,
    email: false,
    password: false,
    passwordConfirmation: false,
    username: false,
  })
  const agreesToTerms = watch('agreesToTerms')
  const handleBlur = (fieldName: keyof typeof validatedFields) => {
    setValidatedFields(prev => ({ ...prev, [fieldName]: true }))
  }
  const shouldValidateOnChange = (fieldName: keyof typeof validatedFields) =>
    validatedFields[fieldName]

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
        if (error.status === 409 && error.data.message === 'existed_email') {
          toast.error('User with this email is already registered')
        }
        if (error.status === 409 && error.data.message === 'existed_login') {
          toast.error('User with this username is already registered')
        } else {
          toast.error(
            error.data.errorsMessages[0].message + ' ' + error.data.errorsMessages[0].field
          )
        }
      })
  })

  return (
    <>
      <Card className={'w-[378px]'} variant={'auth'}>
        <Typography className={'text-center'} variant={'h1'}>
          {translatedForm.title}
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
            label={<FormLabel required>{translatedForm.username}</FormLabel>}
            name={'username'}
            onBlur={() => handleBlur('username')}
            placeholder={'Epam11'}
            shouldValidateOnChange={shouldValidateOnChange('username')}
          />
          <ControlledTextField
            control={control}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
            label={<FormLabel required>{translatedForm.email}</FormLabel>}
            name={'email'}
            onBlur={() => handleBlur('email')}
            placeholder={'Epam@epam.com'}
            shouldValidateOnChange={shouldValidateOnChange('email')}
          />
          <ControlledPasswordTextField
            control={control}
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
            label={<FormLabel required>{translatedForm.password}</FormLabel>}
            name={'password'}
            onBlur={() => handleBlur('password')}
            placeholder={'******************'}
            shouldValidateOnChange={shouldValidateOnChange('password')}
          />

          <ControlledPasswordTextField
            control={control}
            error={!!errors?.passwordConfirmation?.message}
            helperText={errors?.passwordConfirmation?.message}
            label={<FormLabel required>{translatedForm.passwordConfirmation}</FormLabel>}
            name={'passwordConfirmation'}
            onBlur={() => handleBlur('passwordConfirmation')}
            placeholder={'******************'}
            shouldValidateOnChange={shouldValidateOnChange('passwordConfirmation')}
          />
          <ControlledCheckbox
            control={control}
            label={
              <div className={'flex items-center'}>
                <Typography variant={'small'}>{translatedForm.agreeToTerms}</Typography>
                <span className={'mx-1'}>
                  <TextLink
                    className={'mb-1'}
                    color={'primary'}
                    href={PATH.TERMS_OF_SERVICE}
                    size={'small'}
                  >
                    {translatedForm.termsOfService}
                  </TextLink>
                </span>
                <Typography variant={'small'}>{translatedForm.and}</Typography>
                <span className={'mx-1'}>
                  <TextLink
                    className={'mb-1'}
                    color={'primary'}
                    href={PATH.PRIVACY_POLICY}
                    size={'small'}
                    underline
                  >
                    {translatedForm.privacyPolicy}
                  </TextLink>
                </span>
              </div>
            }
            name={'agreesToTerms'}
            onBlur={() => handleBlur('agreesToTerms')}
            shouldValidateOnChange={shouldValidateOnChange('agreesToTerms')}
          />
          {errors.agreesToTerms && (
            <FormHelperText error>{errors.agreesToTerms.message}</FormHelperText>
          )}
          {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
          <Button
            className={'w-full'}
            disabled={!isValid || !agreesToTerms || isLoading}
            type={'submit'}
          >
            {translatedForm.signUp}
          </Button>
          <Typography className={'text-center'} variant={'regular16'}>
            {translatedForm.haveAccount}
          </Typography>
          <TextLink
            className={'text-base font-semibold hover:text-accent-300 hover:underline'}
            href={PATH.SIGN_IN}
            underline={false}
          >
            {translatedForm.signIn}
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
