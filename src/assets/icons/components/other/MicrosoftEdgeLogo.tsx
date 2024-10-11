import { Ref, SVGProps, forwardRef, memo } from 'react'

import {
  defaultIconAttributes,
  defaultIconClassName,
} from '@/assets/icons/components/default-svg-icon-props'
import { cn } from '@/shared/utils'

const SvgMicrosoftEdgeLogo = (
  { className, ...props }: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    className={cn(defaultIconClassName, className)}
    {...defaultIconAttributes}
    {...props}
    ref={ref}
  >
    <g clipPath={'url(#microsoft-edge_svg__a)'}>
      <path
        d={
          'M21.6563 17.8594C21.3375 18.0281 21.0094 18.1781 20.6719 18.3C19.5938 18.7031 18.4594 18.9094 17.3063 18.9094C12.8719 18.9094 9.00937 15.8625 9.00937 11.9437C9.01875 10.875 9.60937 9.89062 10.5469 9.38437C6.53437 9.55312 5.50312 13.7344 5.50312 16.1812C5.50312 23.1094 11.8875 23.8125 13.2656 23.8125C14.0063 23.8125 15.1219 23.5969 15.7969 23.3812L15.9188 23.3437C18.5063 22.4531 20.7 20.7094 22.1625 18.3937C22.275 18.2156 22.2188 17.9906 22.05 17.8781C21.9281 17.8031 21.7781 17.7937 21.6563 17.8594Z'
        }
        fill={'currentColor'}
      />
      <path
        d={
          'M21.6563 17.8594C21.3375 18.0281 21.0094 18.1781 20.6719 18.3C19.5938 18.7031 18.4594 18.9094 17.3063 18.9094C12.8719 18.9094 9.00937 15.8625 9.00937 11.9437C9.01875 10.875 9.60937 9.89062 10.5469 9.38437C6.53437 9.55312 5.50312 13.7344 5.50312 16.1812C5.50312 23.1094 11.8875 23.8125 13.2656 23.8125C14.0063 23.8125 15.1219 23.5969 15.7969 23.3812L15.9188 23.3437C18.5063 22.4531 20.7 20.7094 22.1625 18.3937C22.275 18.2156 22.2188 17.9906 22.05 17.8781C21.9281 17.8031 21.7781 17.7937 21.6563 17.8594Z'
        }
        fill={'currentColor'}
        opacity={0.35}
      />
      <path
        d={
          'M9.90937 22.6312C9.075 22.1156 8.35313 21.4312 7.78125 20.6344C5.31563 17.2594 6.05625 12.525 9.43125 10.0594C9.7875 9.80624 10.1531 9.57186 10.5469 9.38436C10.8375 9.24374 11.3344 8.99999 12 9.00936C12.9469 9.01874 13.8375 9.46874 14.4094 10.2281C14.7844 10.7344 15 11.3437 15.0094 11.9812C15.0094 11.9625 17.3063 4.51874 7.50938 4.51874C3.39375 4.51874 0.00937541 8.42811 0.00937541 11.85C-0.00937459 13.6594 0.384375 15.4594 1.14375 17.1C3.73125 22.6125 10.0313 25.3125 15.8063 23.3906C13.8281 24.0094 11.6719 23.7375 9.90937 22.6312Z'
        }
        fill={'currentColor'}
      />
      <g filter={'url(#microsoft-edge_svg__b)'} opacity={0.41}>
        <path
          d={
            'M9.90937 22.6312C9.075 22.1156 8.35313 21.4312 7.78125 20.6344C5.31563 17.2594 6.05625 12.525 9.43125 10.0594C9.7875 9.80624 10.1531 9.57186 10.5469 9.38436C10.8375 9.24374 11.3344 8.99999 12 9.00936C12.9469 9.01874 13.8375 9.46874 14.4094 10.2281C14.7844 10.7344 15 11.3437 15.0094 11.9812C15.0094 11.9625 17.3063 4.51874 7.50938 4.51874C3.39375 4.51874 0.00937541 8.42811 0.00937541 11.85C-0.00937459 13.6594 0.384375 15.4594 1.14375 17.1C3.73125 22.6125 10.0313 25.3125 15.8063 23.3906C13.8281 24.0094 11.6719 23.7375 9.90937 22.6312Z'
          }
          fill={'currentColor'}
        />
      </g>
      <path
        d={
          'M9.90937 22.6312C9.075 22.1156 8.35313 21.4312 7.78125 20.6344C5.31563 17.2594 6.05625 12.525 9.43125 10.0594C9.7875 9.80624 10.1531 9.57186 10.5469 9.38436C10.8375 9.24374 11.3344 8.99999 12 9.00936C12.9469 9.01874 13.8375 9.46874 14.4094 10.2281C14.7844 10.7344 15 11.3437 15.0094 11.9812C15.0094 11.9625 17.3063 4.51874 7.50938 4.51874C3.39375 4.51874 0.00937541 8.42811 0.00937541 11.85C-0.00937459 13.6594 0.384375 15.4594 1.14375 17.1C3.73125 22.6125 10.0313 25.3125 15.8063 23.3906C13.8281 24.0094 11.6719 23.7375 9.90937 22.6312Z'
        }
        fill={'currentColor'}
      />
      <g filter={'url(#microsoft-edge_svg__c)'}>
        <path
          d={
            'M14.2781 13.9594C14.2031 14.0531 13.9687 14.1937 13.9687 14.4937C13.9687 14.7375 14.1281 14.9719 14.4094 15.1687C15.7594 16.1062 18.3 15.9844 18.3094 15.9844C19.3125 15.9844 20.2875 15.7125 21.15 15.2062C22.9125 14.175 24 12.2906 24 10.2469C24.0281 8.14687 23.25 6.75 22.9406 6.13125C20.9531 2.24062 16.6594 0 12 0C5.4375 0 0.09375 5.26875 0 11.8312C0.046875 8.40937 3.45 5.64375 7.5 5.64375C7.82812 5.64375 9.70312 5.67187 11.4375 6.59062C12.9656 7.39687 13.7719 8.3625 14.325 9.32812C14.9062 10.3312 15.0094 11.5875 15.0094 12.0937C15.0094 12.5906 14.7562 13.3406 14.2781 13.9594Z'
          }
          fill={'currentColor'}
        />
      </g>
    </g>
    <defs>
      <filter
        colorInterpolationFilters={'sRGB'}
        filterUnits={'userSpaceOnUse'}
        height={37.233}
        id={'microsoft-edge_svg__b'}
        width={31.696}
        x={-3.987}
        y={6.778}
      >
        <feFlood floodOpacity={0} result={'BackgroundImageFix'} />
        <feColorMatrix
          in={'SourceAlpha'}
          result={'hardAlpha'}
          values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'}
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2={'hardAlpha'} operator={'out'} />
        <feColorMatrix values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'} />
        <feBlend in2={'BackgroundImageFix'} result={'effect1_dropShadow_26444_7692'} />
        <feBlend in={'SourceGraphic'} in2={'effect1_dropShadow_26444_7692'} result={'shape'} />
      </filter>
      <filter
        colorInterpolationFilters={'sRGB'}
        filterUnits={'userSpaceOnUse'}
        height={31.984}
        id={'microsoft-edge_svg__c'}
        width={44.001}
        x={-4}
        y={0}
      >
        <feFlood floodOpacity={0} result={'BackgroundImageFix'} />
        <feColorMatrix
          in={'SourceAlpha'}
          result={'hardAlpha'}
          values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'}
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2={'hardAlpha'} operator={'out'} />
        <feColorMatrix values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'} />
        <feBlend in2={'BackgroundImageFix'} result={'effect1_dropShadow_26444_7692'} />
        <feBlend in={'SourceGraphic'} in2={'effect1_dropShadow_26444_7692'} result={'shape'} />
      </filter>
      <clipPath id={'microsoft-edge_svg__a'}>
        <path d={'M0 0h36v36H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgMicrosoftEdgeLogo)
const Memo = memo(ForwardRef)

export default Memo
