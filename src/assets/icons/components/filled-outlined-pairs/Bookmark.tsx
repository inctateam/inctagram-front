import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const Bookmark = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>((props, ref) => (
  <SvgIcon {...props} ref={ref}>
    <g clipPath={'url(#bookmark_svg__a)'}>
      <path
        d={
          'M6 21a1 1 0 0 1-.863-.496A1 1 0 0 1 5 20V5.33A2.28 2.28 0 0 1 7.2 3h9.6A2.28 2.28 0 0 1 19 5.33V20a1 1 0 0 1-1.5.86l-5.67-3.21-5.33 3.2A1 1 0 0 1 6 21'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'bookmark_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </SvgIcon>
))

Bookmark.displayName = 'Bookmark'

export { Bookmark }
