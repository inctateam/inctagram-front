'use client'
import error404 from '@/assets/icons/svg/error404.svg'
import { TextLink, Typography } from '@/shared/ui'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div
      className={
        'flex gap-3 flex-col justify-center items-center bg-dark-700 text-white text-center'
      }
    >
      <Image alt={'Error 404'} src={error404} />
      <Typography variant={'h1'}>Page Not Found</Typography>
      <TextLink
        className={
          'text-base text-blue-500 no-underline border border-blue-500 px-4 py-1.5 rounded transition-colors duration-300 hover:bg-blue-500 hover:text-white'
        }
        href={'/'}
      >
        Go Back Home
      </TextLink>
    </div>
  )
}
