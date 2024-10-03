import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const PauseCircle = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <SvgIcon {...props} ref={ref}>
      <g clipPath={'url(#pause-circle_svg__a)'}>
        <path
          d={
            'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-2 13a1 1 0 1 1-2 0V9a1 1 0 0 1 2 0zm6 0a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0z'
          }
          fill={'currentColor'}
        />
      </g>
      <defs>
        <clipPath id={'pause-circle_svg__a'}>
          <path d={'M0 0h24v24H0z'} fill={'#fff'} />
        </clipPath>
      </defs>
    </SvgIcon>
  )
)

PauseCircle.displayName = 'PauseCircle'

export { PauseCircle }
