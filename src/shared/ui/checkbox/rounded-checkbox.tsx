import { forwardRef } from 'react'

import { RadioButtonChecked, RadioButtonUnchecked } from '@/assets/icons'
import { cn } from '@/shared/utils'
import { Checkbox } from '@radix-ui/react-checkbox'

import { Typography } from '../typography'

interface RoundedCheckboxProps {
  checked: boolean
  className?: string
  label?: string
  onChange: (checked: boolean) => void
}

const RoundedCheckbox = forwardRef<HTMLButtonElement, RoundedCheckboxProps>(
  ({ checked, className, label, onChange }, ref) => {
    return (
      <div className={cn('flex items-end gap-4 ', className)}>
        <Checkbox checked={checked} className={'rounded-full'} onCheckedChange={onChange} ref={ref}>
          {checked ? (
            <RadioButtonChecked className={'w-5 h-5'} />
          ) : (
            <RadioButtonUnchecked className={'w-5 h-5'} />
          )}
        </Checkbox>
        {label && <Typography className={'leading-5'}>{label}</Typography>}
      </div>
    )
  }
)

RoundedCheckbox.displayName = 'RoundedCheckbox'

export default RoundedCheckbox
