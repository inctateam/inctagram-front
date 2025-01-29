import { Ref, SVGProps, forwardRef, memo } from 'react'

import {
  defaultIconAttributes,
  defaultIconClassName,
} from '@/assets/icons/components/default-svg-icon-props'
import { cn } from '@/shared/utils'

const SvgYandexLogo = (
  { className, ...props }: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    className={cn(defaultIconClassName, className)}
    {...defaultIconAttributes}
    {...props}
    ref={ref}
  >
    <g clipPath={'url(#yandex_svg__a)'}>
      <path
        d={
          'M12 23.3333C18.2592 23.3333 23.3333 18.2592 23.3333 12C23.3333 5.74076 18.2592 0.666656 12 0.666656C5.74077 0.666656 0.666668 5.74076 0.666668 12C0.666668 18.2592 5.74077 23.3333 12 23.3333Z'
        }
        stroke={'currentColor'}
        strokeWidth={2}
      />
      <path
        d={
          'M6.425 4.754L4.304 6.875L10.504 13.0755V20.4465H13.504V13.0675L19.6965 6.875L17.5755 4.754L12 10.3295L6.425 4.754Z'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'yandex_svg__a'}>
        <path d={'M0 0h36v36H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgYandexLogo)
const Memo = memo(ForwardRef)

export default Memo
