'use client'
import { useForm } from 'react-hook-form'

import { useLoginMutation } from '@/features/auth/api'
import { PropsTranslations } from '@/features/auth/ui'
import { OAuth2 } from '@/features/auth/ui/o-auth-2'
import { LoginFields, createLoginSchema } from '@/features/auth/ui/utils/login-shema'
import { decodeToken } from '@/features/auth/utils/decodeToken'
import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { PATH } from '@/shared/constants'
import {
  Button,
  Card,
  ControlledPasswordTextField,
  ControlledTextField,
  FormLabel,
  ProgressBar,
  TextLink,
  Typography,
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

type Props = {} & PropsTranslations

export function SignInForm({ messagesErrors, translAuth }: Props) {
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation()
  const router = useRouter()

  const loginSchema = createLoginSchema(messagesErrors)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (data: LoginFields) => {
    try {
      const res = await login(data).unwrap()

      if (res) {
        localStorage.setItem('access_token', res.accessToken)
        router.push(`/profile/${decodeToken(res.accessToken)?.userId}`)
      }
    } catch (error: unknown) {
      handleRequestError(error, setError)
    }
  }

  if (isLoadingLogin) {
    return <ProgressBar />
  }

  return (
    <Card className={'flex flex-col w-[378px]'} variant={'auth'}>
      <Typography className={'text-center'} variant={'h1'}>
        {translAuth.signIn}
      </Typography>
      <OAuth2 />
      <form className={'flex flex-col space-y-6 w-full'} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          autoComplete={'email'}
          control={control}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          label={<FormLabel required>{translAuth.email}</FormLabel>}
          name={'email'}
          placeholder={translAuth.email}
        />
        <ControlledPasswordTextField
          autoComplete={'current-password'}
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
