import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const MoreHorizontalOutline = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <SvgIcon {...props} ref={ref}>
      <g clipPath={'url(#more-horizontal-outline_svg__a)'} fill={'currentColor'}>
        <path
          d={
            'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4'
          }
        />
      </g>
      <defs>
        <clipPath id={'more-horizontal-outline_svg__a'}>
          <path d={'M0 0h24v24H0z'} fill={'#fff'} />
        </clipPath>
      </defs>
    </SvgIcon>
  )
)

MoreHorizontalOutline.displayName = 'MoreHorizontalOutline'

export { MoreHorizontalOutline }
