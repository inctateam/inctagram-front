import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const CheckmarkOutline = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <SvgIcon {...props} ref={ref}>
      <g clipPath={'url(#checkmark-outline_svg__a)'}>
        <path
          d={
            'M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1.001 1.001 0 0 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z'
          }
          fill={'currentColor'}
        />
      </g>
      <defs>
        <clipPath id={'checkmark-outline_svg__a'}>
          <path d={'M0 0h24v24H0z'} fill={'#fff'} />
        </clipPath>
      </defs>
    </SvgIcon>
  )
)

CheckmarkOutline.displayName = 'CheckmarkOutline'

export { CheckmarkOutline }
