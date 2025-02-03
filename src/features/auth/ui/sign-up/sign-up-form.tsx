'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { GithubLogo, GoogleLogo } from '@/assets/icons'
import { useSignupMutation } from '@/features/auth/api'
import { EmailSentModal } from '@/features/auth/ui'
import { handleRequestError } from '@/features/auth/utils/handleRequestError'
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
  ProgressBar,
  TextLink,
  Typography,
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import { SignUpFields, signUpSchema } from '../utils/signup-schema'
import { SignUpPageProps } from './sign-up-page'

export function SignUpForm({ translatedForm }: SignUpPageProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm<SignUpFields>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema({ tErrors: translatedForm.errors, translatedForm })),
  })
  const [signup, { isLoading }] = useSignupMutation()

  const [userEmail, setUserEmail] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const [validatedFields, setValidatedFields] = useState({
    agreesToTerms: false,
    email: false,
    password: false,
    passwordConfirmation: false,
    userName: false,
  })
  const agreesToTerms = watch('agreesToTerms', false)
  const password = watch('password', '')
  const passwordConfirmation = watch('passwordConfirmation', '')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      setPasswordError(translatedForm.errors.passwordConfirmation)
    } else {
      setPasswordError('')
    }
  }, [password, passwordConfirmation, translatedForm.errors.passwordConfirmation])

  const handleBlur = (fieldName: keyof typeof validatedFields) => {
    setValidatedFields(prev => ({ ...prev, [fieldName]: true }))
  }
  const shouldValidateOnChange = (fieldName: keyof typeof validatedFields) =>
    validatedFields[fieldName]

  const onSubmit = handleSubmit(data => {
    setUserEmail(data.email)
    signup({
      email: data.email,
      password: data.password,
      userName: data.userName,
    })
      .unwrap()
      .then(() => {
        setModalOpen(true)
      })
      .catch(error => handleRequestError(error, setError))
  })

  return (
    <>
      {isLoading && <ProgressBar />}
      <Card className={'w-[378px]'} variant={'auth'}>
        <Typography className={'text-center'} variant={'h1'}>
          {translatedForm.title}
        </Typography>

        <div className={'flex w-full justify-center space-x-[60px] mt-3 mb-6'}>
          <IconButton asChild className={'text-4xl'}>
            <a href={'https://google.com'} rel={'noreferrer'} target={'_blank'}>
              <GoogleLogo />
            </a>
          </IconButton>
          <IconButton className={'text-4xl'}>
            <GithubLogo />
          </IconButton>
        </div>

        <form className={'flex flex-col space-y-4 w-full'} onSubmit={onSubmit}>
          <ControlledTextField
            control={control}
            error={!!errors?.userName?.message}
            helperText={errors?.userName?.message}
            label={<FormLabel required>{translatedForm.username}</FormLabel>}
            name={'userName'}
            onBlur={() => handleBlur('userName')}
            placeholder={'Epam11'}
            shouldValidateOnChange={shouldValidateOnChange('userName')}
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
            error={!!errors?.passwordConfirmation?.message || !!passwordError}
            helperText={errors?.passwordConfirmation?.message || passwordError}
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
          {!agreesToTerms && (
            <FormHelperText error>{translatedForm.errors.agreesToTerms}</FormHelperText>
          )}
          <Button className={'w-full'} disabled={!agreesToTerms || isLoading} type={'submit'}>
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
