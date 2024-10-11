import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { CheckmarkOutline } from '@/assets/icons/components/outlined'
import { Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { VariantProps, cva } from 'class-variance-authority'

type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root> &
  VariantProps<typeof checkboxVariants>

const labelVariants = cva(['ml-2'], {
  variants: {
    disabled: {
      false: 'text-light-500',
      true: 'text-light-900',
    },
  },
})

const checkboxVariants = cva(
  [
    'text-light-500',
    'w-[18px] h-[18px] m-[3px]',
    'border-2 border-light-500 rounded',
    'flex items-center justify-center',
    'focus:outline-none',
    'relative',
    'disabled:after:content-none',
    'disabled:border-light-900 disabled:text-light-700',
    'after:absolute after:z-[-1] after:w-9 after:h-9 after:rounded-full',
    'hover:after:content-[""] hover:after:bg-dark-300',
    'focus-visible:after:content-[""] focus-visible:after:bg-dark-500',
    'active:after:bg-dark-100',
  ],
  {
    defaultVariants: {
      checked: false,
    },
    variants: {
      checked: {
        false: ['bg-transparent', 'border-light-500', 'text-light-500'],
        indeterminate: [''],
        true: [
          'bg-transparent',
          'text-light-700',
          'disabled:border-light-900 disabled:text-light-700 disabled:bg-light-900',
        ],
      },
    },
  }
)

const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ checked, className, disabled = false, id, label, ...rest }, ref) => {
    const randomId = useId()
    const idForCheckbox = id || randomId

    return (
      <div className={'flex'}>
        <RadixCheckbox.Root
          checked={checked}
          className={cn(checkboxVariants({ checked, className }))}
          disabled={disabled}
          id={idForCheckbox}
          {...rest}
          ref={ref}
        >
          <RadixCheckbox.Indicator className={'pb-1'}>
            <CheckmarkOutline />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <Typography
            as={'label'}
            className={labelVariants({ disabled })}
            htmlFor={idForCheckbox}
            variant={'regular14'}
          >
            {label}
          </Typography>
        )}
      </div>
    )
  }
)

export { Checkbox, type CheckboxProps }
