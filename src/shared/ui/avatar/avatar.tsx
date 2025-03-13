'use client'

import { ComponentPropsWithoutRef, forwardRef } from 'react'

import ImageOutline from '@/assets/icons/components/filled-outlined-pairs/ImageOutline'
import { cn } from '@/shared/utils'
import * as RadixAvatar from '@radix-ui/react-avatar'
import Image from 'next/image'

type AvatarOwnProps = {
  onClick?: () => void
  size: 6 | 9 | 12 | 48
  src?: string
}

type AvatarProps = AvatarOwnProps & Omit<ComponentPropsWithoutRef<typeof Image>, 'src'>

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ alt = 'Profile avatar', className, height, onClick, size, src, width, ...props }, ref) => {
    const iconSizeMap: Record<AvatarOwnProps['size'], string> = {
      6: 'w-6 h-6',
      9: 'w-6 h-6',
      12: 'w-9 h-9',
      48: 'w-12 h-12',
    }

    const containerSizeMap: Record<AvatarOwnProps['size'], string> = {
      6: 'h-6 w-6',
      9: 'h-9 w-9',
      12: 'h-12 w-12',
      48: 'h-48 w-48',
    }

    return (
      <RadixAvatar.Root
        className={cn(
          `inline-flex items-center justify-center overflow-hidden rounded-full bg-dark-500 transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer`,
          containerSizeMap[size],
          className
        )}
        onClick={onClick}
        ref={ref}
      >
        {src ? (
          <Image
            {...props}
            alt={alt}
            className={'h-full w-full object-cover'}
            height={height || 48}
            src={src}
            width={width || 48}
          />
        ) : (
          <ImageOutline className={cn(iconSizeMap[size], 'text-light-100')} />
        )}
      </RadixAvatar.Root>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }
