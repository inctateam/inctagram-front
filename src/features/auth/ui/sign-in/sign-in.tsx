import { useForm } from 'react-hook-form'

import { GithubLogo, GoogleLogo } from '@/assets/icons'
import {
  Button,
  Card,
  ControlledPasswordTextField,
  ControlledTextField,
  IconButton,
  TextLink,
  Typography,
} from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
})

export type LoginFields = z.infer<typeof loginSchema>

type Props = {
  onSubmit: (data: LoginFields) => void
}

export const SignIn = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card className={'flex flex-col'} variant={'auth'}>
      <Typography className={'text-center'} variant={'h1'}>
        Sign In
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

      <form className={'flex flex-col space-y-6'} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
        />
        <ControlledPasswordTextField
          control={control}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
        />
        <TextLink
          className={
            'flex justify-end text-light-900 hover:text-accent-500 hover:underline duration-200 mt-9 mb-6 '
          }
          href={'/forgot-password'}
          underline={false}
        >
          Forgot Password?
        </TextLink>
        <Button className={'w-full font-semibold'} type={'submit'} variant={'primary'}>
          Sign In
        </Button>
      </form>
      <Typography className={'text-center mt-4 mb-3'} variant={'regular16'}>
        Don’t have an account?
      </Typography>
      <TextLink
        className={'text-base font-semibold hover:text-accent-300 hover:underline'}
        href={'/sign-up'}
        underline={false}
      >
        Sign In
      </TextLink>
    </Card>
  )
}
