import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const Edit = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>((props, ref) => (
  <SvgIcon {...props} ref={ref}>
    <g clipPath={'url(#edit_svg__a)'} fill={'currentColor'}>
      <path
        d={
          'M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2M5 18h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71L16.66 2.6A2 2 0 0 0 14 2.53l-9 9a2 2 0 0 0-.57 1.21L4 16.91A1 1 0 0 0 5 18M15.27 4 18 6.73l-2 1.95L13.32 6z'
        }
      />
    </g>
    <defs>
      <clipPath id={'edit_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </SvgIcon>
))

Edit.displayName = 'Edit'

export { Edit }
