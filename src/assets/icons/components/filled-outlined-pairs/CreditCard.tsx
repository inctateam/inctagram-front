import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const CreditCard = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>((props, ref) => (
  <SvgIcon {...props} ref={ref}>
    <g clipPath={'url(#credit-card_svg__a)'}>
      <path
        d={
          'M19 5H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m-8 10H7a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2m6 0h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2m3-6H4V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'credit-card_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </SvgIcon>
))

CreditCard.displayName = 'CreditCard'

export { CreditCard }
