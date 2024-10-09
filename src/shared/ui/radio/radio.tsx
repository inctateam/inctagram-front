import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as RadixRadio from '@radix-ui/react-radio-group'

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
const Radio = forwardRef<ElementRef<typeof RadixRadio.Root>, RadioProps>((props, ref) => {
  const { className, disabled, options, ...rest } = props

  const defaultOption = options.find(i => i.defaultValue)?.value || options[0].value

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
          return (
            <div className={'flex'} key={option.id}>
              <RadixRadio.Item
                className={cn(
                  'relative w-[22px] h-[22px] m-[3px] border-2 border-light-100 cursor-pointer rounded-full bg-transparent border:z-0 outline-none',
                  'before:absolute before:top-1/2 before:left-1/2 before:w-9 before:h-9 before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:z-[-1]',
                  'hover:before:content-[""] hover:before:bg-dark-300'
                  // option.disabled && 'cursor-not-allowed border-gray-500'
                )}
                disabled={option.disabled}
                id={option.id}
                value={option.value}
              >
                <RadixRadio.Indicator
                  className={
                    'relative flex items-center justify-center after:block after:size-[10px] after:rounded-full after:bg-light-100'
                  }
                />
              </RadixRadio.Item>
              <Typography
                as={'label'}
                className={'ml-2 text-light-100'}
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

//    'text-light-500',
//     'w-[18px] h-[18px] m-[3px]',
//     'border-2 border-light-500 rounded',
//     'flex items-center justify-center',
//     'focus:outline-none',
//     'relative',
//     'disabled:after:content-none',
//     'disabled:border-light-900 disabled:text-light-700',
//     'after:absolute after:z-[-1] after:w-9 after:h-9 after:rounded-full',
//     'hover:after:content-[""] hover:after:bg-dark-300',
//     'focus-visible:after:content-[""] focus-visible:after:bg-dark-500',
//     'active:after:bg-dark-100',
