import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CheckmarkOutline } from '@/assets/icons'
import { useGenerateId } from '@/shared/hooks'
import { Label, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as RadixCheckbox from '@radix-ui/react-checkbox'

type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ className, disabled = false, id, label, ...rest }, ref) => {
    const checkboxId = useGenerateId(id)

    const checkboxStyles = cn(
      [
        ['bg-transparent', 'border-light-500', 'text-light-500'],
        [
          'data-[state=checked]:bg-light-100',
          'data-[state=checked]:text-dark-100',
          'data-[state=checked]:border-light-100',
        ],
        'text-light-500',
        'w-[18px] h-[18px] m-[3px]',
        'border-2 border-light-500 rounded',
        'flex items-center justify-center',
        'focus:outline-none',
        'relative',
        'transition',
        'after:absolute after:z-[-1] after:w-9 after:h-9 after:rounded-full',
        'hover:after:content-[""] hover:after:bg-dark-300',
        'active:after:bg-dark-100',
        'focus-visible:after:content-[""] focus-visible:after:bg-dark-500',
        'disabled:after:content-none',
        'disabled:border-light-900',
        'disabled:data-[state=checked]:bg-dark-100 disabled:data-[state=checked]:border-dark-100 disabled:data-[state=checked]:text-light-700',
      ],
      className
    )

    const labelStyles = cn('ml-2', disabled ? 'text-light-900' : 'text-light-500')

    return (
      <div className={'flex'}>
        <RadixCheckbox.Root
          className={checkboxStyles}
          disabled={disabled}
          id={checkboxId}
          {...rest}
          ref={ref}
        >
          <RadixCheckbox.Indicator className={'pb-1'}>
            <CheckmarkOutline />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <Typography as={Label} className={labelStyles} htmlFor={checkboxId} variant={'regular14'}>
            {label}
          </Typography>
        )}
      </div>
    )
  }
)

export { Checkbox, type CheckboxProps }
