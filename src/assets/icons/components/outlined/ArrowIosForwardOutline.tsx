import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const ArrowIosForwardOutline = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <SvgIcon {...props} ref={ref}>
      <g clipPath={'url(#arrow-ios-forward-outline_svg__a)'}>
        <path
          d={
            'M10 19a1 1 0 0 1-.77-1.64L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19'
          }
          fill={'currentColor'}
        />
      </g>
      <defs>
        <clipPath id={'arrow-ios-forward-outline_svg__a'}>
          <path d={'M0 0h24v24H0z'} fill={'#fff'} />
        </clipPath>
      </defs>
    </SvgIcon>
  )
)

ArrowIosForwardOutline.displayName = 'ArrowIosForwardOutline'

export { ArrowIosForwardOutline }
