import { Ref, SVGProps, forwardRef, memo } from 'react'

import {
  defaultIconAttributes,
  defaultIconClassName,
} from '@/assets/icons/components/default-svg-icon-props'
import { cn } from '@/shared/utils'

const SvgBookmark = ({ className, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    className={cn(defaultIconClassName, className)}
    {...defaultIconAttributes}
    {...props}
    ref={ref}
  >
    <g clipPath={'url(#bookmark_svg__a)'}>
      <path
        d={
          'M6 21a1 1 0 0 1-.863-.496A1 1 0 0 1 5 20V5.33A2.28 2.28 0 0 1 7.2 3h9.6A2.28 2.28 0 0 1 19 5.33V20a1 1 0 0 1-1.5.86l-5.67-3.21-5.33 3.2A1 1 0 0 1 6 21'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'bookmark_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgBookmark)
const Memo = memo(ForwardRef)

export default Memo
