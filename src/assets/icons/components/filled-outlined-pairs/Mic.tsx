import { Ref, SVGProps, forwardRef, memo } from 'react'

import {
  defaultIconAttributes,
  defaultIconClassName,
} from '@/assets/icons/components/default-svg-icon-props'
import { cn } from '@/shared/utils'

const SvgMic = ({ className, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    className={cn(defaultIconClassName, className)}
    {...defaultIconAttributes}
    {...props}
    ref={ref}
  >
    <g clipPath={'url(#mic_svg__a)'} fill={'currentColor'}>
      <path d={'M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4'} />
      <path
        d={
          'M19 11a1 1 0 0 0-2 0 5 5 0 1 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.92V20H8.89a.89.89 0 0 0-.89.89v.22a.89.89 0 0 0 .89.89h6.22a.89.89 0 0 0 .89-.89v-.22a.89.89 0 0 0-.89-.89H13v-2.08A7 7 0 0 0 19 11'
        }
      />
    </g>
    <defs>
      <clipPath id={'mic_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgMic)
const Memo = memo(ForwardRef)

export default Memo
