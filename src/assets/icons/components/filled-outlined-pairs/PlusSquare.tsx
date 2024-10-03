import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const PlusSquare = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>((props, ref) => (
  <SvgIcon {...props} ref={ref}>
    <g clipPath={'url(#plus-square_svg__a)'}>
      <path
        d={
          'M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3m-3 10h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'plus-square_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </SvgIcon>
))

PlusSquare.displayName = 'PlusSquare'

export { PlusSquare }
