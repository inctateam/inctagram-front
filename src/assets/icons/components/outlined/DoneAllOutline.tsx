import { ElementRef, SVGProps, forwardRef } from 'react'

import { SvgIcon } from '@/shared/ui'

const DoneAllOutline = forwardRef<ElementRef<typeof SvgIcon>, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <SvgIcon {...props} ref={ref}>
      <g clipPath={'url(#done-all-outline_svg__a)'} fill={'currentColor'}>
        <path
          d={
            'M16.62 6.21a1 1 0 0 0-1.41.17l-7 9-3.43-4.18a1 1 0 1 0-1.56 1.25l4.17 5.18a1 1 0 0 0 .78.37 1 1 0 0 0 .83-.38l7.83-10a1 1 0 0 0-.21-1.41M21.62 6.21a1 1 0 0 0-1.41.17l-7 9-.61-.75-1.26 1.62 1.1 1.37a1 1 0 0 0 1.56-.01l7.83-10a1 1 0 0 0-.21-1.4'
          }
        />
        <path d={'M8.71 13.06 10 11.44l-.2-.24a1 1 0 0 0-1.43-.2 1 1 0 0 0-.15 1.41z'} />
      </g>
      <defs>
        <clipPath id={'done-all-outline_svg__a'}>
          <path d={'M0 0h24v24H0z'} fill={'#fff'} />
        </clipPath>
      </defs>
    </SvgIcon>
  )
)

DoneAllOutline.displayName = 'DoneAllOutline'

export { DoneAllOutline }
