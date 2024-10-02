import { SVGProps, forwardRef } from 'react'

import { cn } from '@/shared/utils'

import { defaultIconAttributes, defaultIconClassName } from './default-svg-icon-props'

const SvgIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        {...defaultIconAttributes}
        className={cn(defaultIconClassName, className)}
        {...props}
        ref={ref}
      />
    )
  }
)

SvgIcon.displayName = 'SvgIcon'

export { SvgIcon }
