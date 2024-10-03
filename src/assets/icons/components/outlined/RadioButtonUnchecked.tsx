import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const RadioButtonUnchecked = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <SvgIcon {...props} ref={ref}>
      <g clipPath={'url(#radio-button-unchecked_svg__a)'}>
        <path
          d={
            'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8'
          }
          fill={'currentColor'}
        />
      </g>
      <defs>
        <clipPath id={'radio-button-unchecked_svg__a'}>
          <path d={'M0 0h24v24H0z'} fill={'#fff'} />
        </clipPath>
      </defs>
    </SvgIcon>
  )
)

RadioButtonUnchecked.displayName = 'RadioButtonUnchecked'

export { RadioButtonUnchecked }
