import { ReactNode } from 'react'

import { cn } from '@/shared/utils'

import { SIDEBAR_ITEMS } from './types'

interface SidebarItemProps {
  href?: string
  icon: ReactNode
  isActive?: boolean
  isDisabled?: boolean
  item: SIDEBAR_ITEMS
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
    <a
      className={cn(`flex items-center space-x-3
         hover:text-accent-100
         focus:outline focus:outline-accent-500

         ${activeClass} ${disabledClass}, className`)}
      href={href}
      onClick={onClick}
    >
      {icon && <div className={'w-6 h-6'}>{icon}</div>}
      <span>{item}</span>
    </a>
  )
}
