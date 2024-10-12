import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as RadixRadio from '@radix-ui/react-radio-group'
import { cva } from 'class-variance-authority'

export type RadioProps = {
  options: Option[]
} & ComponentPropsWithoutRef<typeof RadixRadio.Root>

export type Option = {
  defaultValue?: boolean
  disabled?: boolean
  id: string
  label: string
  value: string
}

const radioItemStyles = cva(
  [
    'relative w-[22px] h-[22px] m-[3px] outline-none',
    'border-2 border-light-100 cursor-pointer rounded-full bg-transparent border:z-0 ',
    'before:absolute before:w-9 before:h-9 before:top-1/2 before:left-1/2 before:rounded-full',
    'before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:z-[-1]',
    'active:before:content-[""] active:before:bg-dark-100',
    'hover:before:content-[""] hover:before:bg-dark-300',
    'focus-visible:before:content-[""] focus-visible:before:bg-dark-500',
  ],
  {
    defaultVariants: {
      disabled: false,
    },
    variants: {
      disabled: {
        false: '',
        true: 'disabled:before:content-none disabled:cursor-auto disabled:border-dark-100',
      },
    },
  }
)

const indicatorStyles = cva(
  [
    'relative flex items-center justify-center',
    'after:block after:size-[10px] after:rounded-full after:bg-light-100',
  ],
  {
    defaultVariants: {
      disabled: false,
    },
    variants: {
      disabled: {
        false: 'after:bg-light-100',
        true: 'after:bg-dark-100',
      },
    },
  }
)

const Radio = forwardRef<ElementRef<typeof RadixRadio.Root>, RadioProps>((props, ref) => {
  const { className, disabled, options, ...rest } = props

  const defaultOption = options.find(option => option.defaultValue)?.value || options[0].value

  return (
    <div>
      <RadixRadio.Root
        className={cn('flex flex-col justify-center items-start gap-1 ', className)}
        defaultValue={defaultOption}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {options.map(option => {
          const disabledItem = disabled || option?.disabled

          return (
            <div aria-disabled={option.disabled} className={'flex'} key={option.id}>
              <RadixRadio.Item
                className={cn(radioItemStyles({ disabled: disabledItem }))}
                disabled={disabledItem}
                id={option.id}
                value={option.value}
              >
                <RadixRadio.Indicator className={cn(indicatorStyles({ disabled: disabledItem }))} />
              </RadixRadio.Item>
              <Typography
                as={'label'}
                className={cn('ml-2', disabledItem && 'text-light-900')}
                htmlFor={option.id}
                variant={'regular14'}
              >
                {option.label}
              </Typography>
            </div>
          )
        })}
      </RadixRadio.Root>
    </div>
  )
})

export { Radio }
