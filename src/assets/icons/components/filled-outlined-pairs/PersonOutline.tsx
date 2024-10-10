import { Ref, SVGProps, forwardRef, memo } from 'react'

import {
  defaultIconAttributes,
  defaultIconClassName,
} from '@/assets/icons/components/default-svg-icon-props'
import { cn } from '@/shared/utils'

const SvgPersonOutline = (
  { className, ...props }: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    className={cn(defaultIconClassName, className)}
    {...defaultIconAttributes}
    {...props}
    ref={ref}
  >
    <g clipPath={'url(#person-outline_svg__a)'} fill={'currentColor'}>
      <path
        d={
          'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4M12 13a7 7 0 0 0-7 7 1 1 0 1 0 2 0 5 5 0 1 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7'
        }
      />
    </g>
    <defs>
      <clipPath id={'person-outline_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgPersonOutline)
const Memo = memo(ForwardRef)

export default Memo
