import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { LogOutOutline, Person } from '@/assets/icons'
import { Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'

type Props = {
  email: string
  name: string
  photo: string
  photoDesc: string
  profilePageHref: string
}

export const Dropdown = ({ email, name, photo, photoDesc, profilePageHref }: Props) => {
  return (
    <DropdownMenu trigger={<Image alt={photoDesc} src={photo} />}>
      <DropdownItem>
        <div>
          <Image alt={photoDesc} src={photo} />
          <div>
            <Typography>{name}</Typography>
            <Typography>{email}</Typography>
          </div>
        </div>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem asChild>
        <Person />
        <a href={profilePageHref}>My profile</a>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem>
        <LogOutOutline />
        Sing Out
      </DropdownItem>
    </DropdownMenu>
  )
}

type MenuProps = {
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>
const DropdownMenu = ({ children, trigger, ...rest }: MenuProps) => {
  return (
    <DropdownMenuRadix.Root {...rest}>
      <DropdownMenuRadix.Trigger>{trigger}</DropdownMenuRadix.Trigger>
      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content className={''} sideOffset={5}>
          {children}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}

type ItemProps = ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>
const DropdownItem = ({ className, ...rest }: ItemProps) => {
  return <DropdownMenuRadix.Item className={cn('m-0', className)} {...rest} />
}
const DropdownSeparator = () => {
  return <DropdownMenuRadix.Separator className={cn('m-0')} />
}
