import { ReactNode } from 'react'

import { cn } from '@/shared/utils'
import { Slot } from '@radix-ui/react-slot'

type BadgeProps = {
  badgeContent?: number
  children: ReactNode
  className?: string
}

const badgeStyles = {
  boxWrap: cn('relative'),
  icon: cn('relative m-0 h-5 w-5 '),
  indicator: cn(
    'absolute flex justify-center items-center',
    'bg-danger-500',
    `h-3 min-w-3 w-fit z-0 rounded-full p-[3px]`,
    'text-[10px] leading-2',
    'bottom-3 left-3'
  ),
}

const Badge = (props: BadgeProps) => {
  const { badgeContent, children, className } = props

  const Component = Slot

  return (
    <div className={badgeStyles.boxWrap}>
      <Component className={badgeStyles.icon}>{children}</Component>
      {badgeContent && badgeContent > 0 && (
        <div className={cn(badgeStyles.indicator, className)}>{badgeContent}</div>
      )}
    </div>
  )
}

Badge.displayName = 'Badge'

export { Badge, type BadgeProps }
