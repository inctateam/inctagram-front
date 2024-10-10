import { ReactNode } from 'react'

import { cn } from '@/shared/utils'

export type BadgeProps = {
  badgeColor?: string
  badgeContent: number
  children: ReactNode
  className?: string
}

const Badge = (props: BadgeProps) => {
  const { badgeColor = 'danger-500', badgeContent, children, className } = props

  return (
    <div className={cn('relative w-6 h-6', className)}>
      <div className={'absolute flex bottom-0 left-0 -z[-2] m-0'}>{children}</div>
      {badgeContent > 0 && (
        <div
          className={cn(
            'absolute flex justify-center items-center',
            `bg-${badgeColor}`,
            `h-[16px] min-w-[16px] w-fit p-[3px] z-0 rounded-full`,
            'text-[10px] leading-2',
            'top-0 right-0'
          )}
        >
          {badgeContent}
        </div>
      )}
    </div>
  )
}

export { Badge }
