import { GithubLogo, GoogleLogo } from '@/assets/icons'
import { Card, IconButton, Typography } from '@/shared/ui'
import { z } from 'zod'

const signUpSchema = z
  .object({
    agreesToTerms: z.literal(true),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: z.string().min(6, 'Password must be at least 6 characters'),
    username: z.string(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })

export default function SignUp() {
  return (
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
    </Card>
  )
}
