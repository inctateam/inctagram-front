import { Ref, SVGProps, forwardRef, memo } from 'react'

import {
  defaultIconAttributes,
  defaultIconClassName,
} from '@/assets/icons/components/default-svg-icon-props'
import { cn } from '@/shared/utils'

const SvgHome = ({ className, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    className={cn(defaultIconClassName, className)}
    {...defaultIconAttributes}
    {...props}
    ref={ref}
  >
    <g clipPath={'url(#home_svg__a)'} fill={'currentColor'}>
      <path d={'M14 14h-4v7h4z'} />
      <path
        d={
          'M20.42 10.18 12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2H8v-9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v9h3.11A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44'
        }
      />
    </g>
    <defs>
      <clipPath id={'home_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgHome)
const Memo = memo(ForwardRef)

export default Memo
