import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const Person = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>((props, ref) => (
  <SvgIcon {...props} ref={ref}>
    <g clipPath={'url(#person_svg__a)'} fill={'currentColor'}>
      <path
        d={'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M18 21a1 1 0 0 0 1-1 7 7 0 1 0-14 0 1 1 0 0 0 1 1z'}
      />
    </g>
    <defs>
      <clipPath id={'person_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </SvgIcon>
))

Person.displayName = 'Person'

export { Person }
