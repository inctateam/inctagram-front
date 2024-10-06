import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const BlockOutline = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <SvgIcon {...props} ref={ref}>
      <g clipPath={'url(#block_svg__a)'}>
        <path
          d={'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20'}
          fill={'currentColor'}
        />
        <path d={'m7.043 19.362 10-15'} stroke={'#000'} strokeWidth={2.3} />
      </g>
      <defs>
        <clipPath id={'block_svg__a'}>
          <path d={'M0 0h24v24H0z'} fill={'#fff'} />
        </clipPath>
      </defs>
    </SvgIcon>
  )
)

BlockOutline.displayName = 'BlockOutline'

export { BlockOutline }
