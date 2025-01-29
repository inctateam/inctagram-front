'use client'
import { useForm } from 'react-hook-form'

import { GithubLogo, GoogleLogo } from '@/assets/icons'
import { PropsTranslations } from '@/features/auth/ui'
import { LoginFields, createLoginSchema } from '@/features/auth/ui/utils/login-shema'
import { PATH } from '@/shared/constants'
import {
  Button,
  Card,
  ControlledPasswordTextField,
  ControlledTextField,
  FormLabel,
  IconButton,
  TextLink,
  Typography,
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  handleGithubLogin: () => void
  handleGoogleLogin: () => void
  onSubmit: (data: LoginFields) => void
} & PropsTranslations

export function SignInForm({
  handleGithubLogin,
  handleGoogleLogin,
  messagesErrors,
  onSubmit,
  translAuth,
}: Props) {
  const loginSchema = createLoginSchema(messagesErrors)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card className={'flex flex-col w-[378px]'} variant={'auth'}>
      <Typography className={'text-center'} variant={'h1'}>
        {translAuth.signIn}
      </Typography>

      <div className={'flex w-full justify-center space-x-[60px] mt-3 mb-6'}>
        <IconButton className={'text-4xl'} onClick={handleGoogleLogin}>
          <GoogleLogo />
        </IconButton>
        <IconButton className={'text-4xl'} onClick={handleGithubLogin}>
          <GithubLogo />
        </IconButton>
      </div>

      <form className={'flex flex-col space-y-6 w-full'} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          label={<FormLabel required>{translAuth.email}</FormLabel>}
          name={'email'}
          placeholder={translAuth.email}
        />
        <ControlledPasswordTextField
          control={control}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          label={<FormLabel required>{translAuth.password}</FormLabel>}
          name={'password'}
          placeholder={translAuth.password}
        />
        <TextLink
          className={
            'flex justify-end text-light-900 hover:text-accent-500 hover:underline duration-200 mt-9 mb-6 '
          }
          href={PATH.PASSWORD_RECOVERY}
          underline={false}
        >
          {translAuth.forgotPassword}?
        </TextLink>
        <Button className={'w-full font-semibold'} type={'submit'} variant={'primary'}>
          {translAuth.signIn}
        </Button>
      </form>
      <Typography className={'text-center mt-4 mb-3'} variant={'regular16'}>
        {translAuth.dontHaveAnAccount}?
      </Typography>
      <TextLink
        className={'text-base font-semibold hover:text-accent-300 hover:underline'}
        href={PATH.SIGN_UP}
        underline={false}
      >
        {translAuth.signUp}
      </TextLink>
    </Card>
  )
}
