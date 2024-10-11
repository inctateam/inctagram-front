import { ReactNode } from 'react'

import { cn } from '@/shared/utils'

type BadgeProps = {
  badgeContent: number
  children: ReactNode
  className?: string
}

const badgeStyles = {
  boxWrap: cn('relative w-6 h-6'),
  icon: cn('absolute flex bottom-0 left-0 -z[-2] m-0'),
  indicator: cn(
    'absolute flex justify-center items-center',
    'bg-danger-500',
    `h-[16px] min-w-[16px] w-fit p-[3px] z-0 rounded-full`,
    'text-[10px] leading-2',
    'top-0 right-0'
  ),
}

const Badge = (props: BadgeProps) => {
  const { badgeContent, children, className } = props

  return (
    <div className={badgeStyles.boxWrap}>
      <div className={badgeStyles.icon}>{children}</div>
      {badgeContent > 0 && (
        <div className={cn(badgeStyles.indicator, className)}>{badgeContent}</div>
      )}
    </div>
  )
}

Badge.displayName = 'Badge'

export { Badge, type BadgeProps }
