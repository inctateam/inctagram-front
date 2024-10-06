import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const PersonAdd = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>((props, ref) => (
  <SvgIcon {...props} ref={ref}>
    <g clipPath={'url(#person-add_svg__a)'} fill={'currentColor'}>
      <path
        d={
          'M21 6h-1V5a1 1 0 0 0-2 0v1h-1a1 1 0 1 0 0 2h1v1a1 1 0 0 0 2 0V8h1a1 1 0 1 0 0-2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M16 21a1 1 0 0 0 1-1 7 7 0 1 0-14 0 1 1 0 0 0 1 1'
        }
      />
    </g>
    <defs>
      <clipPath id={'person-add_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </SvgIcon>
))

PersonAdd.displayName = 'PersonAdd'

export { PersonAdd }
