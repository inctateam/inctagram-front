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
    <div className={'flex flex-row'}>
      <RadixRadio.Root
        className={cn('flex items-center', className)}
        defaultValue={defaultOption}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {options.map(option => {
          return (
            <div key={option.id}>
              <RadixRadio.Item
                className={
                  'size-[22px] m-[3px] border-2 bolder-light-700 cursor-default rounded-full bg-transparent outline-none hover:bg-light-700'
                }
                disabled={option.disabled}
                id={option.id}
                value={option.value}
              >
                <RadixRadio.Indicator
                  className={
                    'relative flex items-center justify-center after:block after:size-[10px] after:rounded-full after:bg-light-700'
                  }
                />
              </RadixRadio.Item>
              <Typography
                as={'label'}
                className={'ml-2 text-[15px] leading-none text-light-700'}
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
