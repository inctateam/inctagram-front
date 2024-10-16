import { useForm } from 'react-hook-form'

import { GithubLogo, GoogleLogo } from '@/assets/icons'
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
      .refine(value => {
        if (value === 'Username') {
          return false
        }
      }, 'User with this username is already registered'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'The passwords must match',
    path: ['passwordConfirmation'],
  })

type SignUpFields = z.infer<typeof signUpSchema>

export default function SignUp() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Card
        className={'w-[378px] h-[648px] pt-[23px] flex flex-col justify-between items-center'}
        variant={'auth'}
      >
        <Typography variant={'h1'}>Sign up</Typography>
        <div className={'flex gap-8'}>
          <IconButton>
            <GoogleLogo className={'h-9 w-9'} />
          </IconButton>
          <IconButton>
            <GithubLogo className={'h-9 w-9'} />
          </IconButton>
        </div>
        <ControlledTextField
          control={control}
          label={<FormLabel required>Username</FormLabel>}
          name={'username'}
          placeholder={'Epam11'}
        />
        {errors.username && (
          <FormHelperText error style={{ alignSelf: 'start' }}>
            {errors.username.message}
          </FormHelperText>
        )}
        <ControlledTextField
          control={control}
          label={<FormLabel required>Email</FormLabel>}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
        <ControlledPasswordTextField
          control={control}
          label={<FormLabel required>Password</FormLabel>}
          name={'password'}
          placeholder={'******************'}
        />
        {errors.password && (
          <FormHelperText error style={{ alignSelf: 'start' }}>
            {errors.password.message}
          </FormHelperText>
        )}
        <ControlledPasswordTextField
          control={control}
          label={<FormLabel required>Password confirmation</FormLabel>}
          name={'passwordConfirmation'}
          placeholder={'******************'}
        />
        {errors.passwordConfirmation && (
          <FormHelperText error style={{ alignSelf: 'start' }}>
            {errors.passwordConfirmation.message}
          </FormHelperText>
        )}
        <ControlledCheckbox
          control={control}
          label={
            <div className={'flex items-center'}>
              <Typography variant={'small'}>{'I agree to the '}</Typography>
              <span className={'mx-1'}>
                <TextLink className={'mb-1'} color={'primary'} href={'#'} size={'small'}>
                  Terms of service
                </TextLink>
              </span>
              <Typography variant={'small'}> and </Typography>
              <span className={'mx-1'}>
                <TextLink className={'mb-1'} color={'primary'} href={'#'} size={'small'} underline>
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
        <Button className={'w-full'} type={'submit'}>
          Sign up
        </Button>
        <Typography className={'text-center'} variant={'regular16'}>
          Do you have an account?
        </Typography>
        <Button className={'w-full'} variant={'text'}>
          Sign In
        </Button>
      </Card>
    </form>
  )
}
