import { ReactNode } from 'react'

import { PATH } from '@/shared/constants'
import { cn } from '@/shared/utils'

import { TextLink } from '../text-link'

interface SidebarItemProps {
  href: (typeof PATH)[keyof typeof PATH] | string //string убрать потом, когда все пути сделаются константами
  icon: ReactNode
  isActive?: boolean
  isDisabled?: boolean
  item: string
  onClick?: () => void
}
export const SidebarItem = ({
  href,
  icon,
  isActive = false,
  isDisabled = false,
  item,
  onClick,
}: SidebarItemProps) => {
  const activeClass = isActive ? 'text-accent-500' : ''
  const disabledClass = isDisabled ? 'pointer-events-none text-dark-100' : ''

  return (
    <TextLink
      className={cn(
        `flex justify-start gap-3 hover:text-accent-100 ${activeClass} ${disabledClass} `
      )}
      color={'regular'}
      href={href}
      onClick={onClick}
      underline={false}
    >
      {icon && <div className={'w-6 h-6'}>{icon}</div>}
      <span>{item}</span>
    </TextLink>
  )
}
