import { Ref, SVGProps, forwardRef, memo } from 'react'

import {
  defaultIconAttributes,
  defaultIconClassName,
} from '@/assets/icons/components/default-svg-icon-props'
import { cn } from '@/shared/utils'

const SvgOutlineBell = (
  { className, ...props }: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    className={cn(defaultIconClassName, className)}
    {...defaultIconAttributes}
    {...props}
    ref={ref}
  >
    <path
      clipRule={'evenodd'}
      d={
        'M5.51534 15.9989L6.69534 14.8169C7.07334 14.4389 7.28134 13.9369 7.28134 13.4029V8.72586C7.28134 7.36886 7.87134 6.07186 8.90134 5.16986C9.93934 4.25986 11.2613 3.85986 12.6383 4.04086C14.9653 4.34986 16.7203 6.45386 16.7203 8.93586V13.4029C16.7203 13.9369 16.9283 14.4389 17.3053 14.8159L18.4863 15.9989H5.51534ZM14.0003 18.3399C14.0003 19.2389 13.0843 19.9989 12.0003 19.9989C10.9163 19.9989 10.0003 19.2389 10.0003 18.3399V17.9989H14.0003V18.3399ZM20.5213 15.2069L18.7203 13.4029V8.93586C18.7203 5.45486 16.2183 2.49786 12.9003 2.05886C10.9783 1.80286 9.03834 2.38986 7.58334 3.66586C6.11934 4.94786 5.28134 6.79186 5.28134 8.72586L5.28034 13.4029L3.47934 15.2069C3.01034 15.6769 2.87134 16.3759 3.12534 16.9889C3.38034 17.6029 3.97334 17.9989 4.63734 17.9989H8.00034V18.3399C8.00034 20.3579 9.79434 21.9989 12.0003 21.9989C14.2063 21.9989 16.0003 20.3579 16.0003 18.3399V17.9989H19.3633C20.0273 17.9989 20.6193 17.6029 20.8733 16.9899C21.1283 16.3759 20.9903 15.6759 20.5213 15.2069Z'
      }
      fill={'currentColor'}
      fillRule={'evenodd'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgOutlineBell)
const Memo = memo(ForwardRef)

export default Memo
