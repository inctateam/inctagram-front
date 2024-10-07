import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CheckmarkOutline } from '@/assets/icons/components/outlined'
import { Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'

type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  (
    { className, disabled = false, id = 'root', label = 'Check-box', ...rest }, // remove default value in label
    ref
  ) => {
    return (
      <div className={`flex items-center`}>
        <LabelRadix.Root asChild className={cn('flex flex-row', 'text-light-500')}>
          <Typography as={'label'} variant={'regular14'}>
            <RadixCheckbox.Root
              className={cn(
                'w-[18px] h-[18px] m-[3px]',
                'border-2 border-light-500 rounded',
                'flex flex-row items-center justify-center',
                'focus:outline-none',
                className
              )}
              disabled={disabled}
              id={id}
              {...rest}
              onClick={() => {
                console.log('check-box')
              }}
              ref={ref}
            >
              <RadixCheckbox.Indicator className={`text-light-500`}>
                <CheckmarkOutline />
              </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            {label}
          </Typography>
        </LabelRadix.Root>
      </div>
    )
  }
)

export { Checkbox, type CheckboxProps }
