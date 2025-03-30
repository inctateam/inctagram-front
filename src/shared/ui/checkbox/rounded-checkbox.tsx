import { forwardRef } from 'react'

import { RadioButtonChecked, RadioButtonUnchecked } from '@/assets/icons'
import { Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'
import { Checkbox } from '@radix-ui/react-checkbox'

interface RoundedCheckboxProps {
  checked: boolean
  className?: string
  disabled?: boolean
  label?: string
  onChange: (checked: boolean) => void
}

const RoundedCheckbox = forwardRef<HTMLButtonElement, RoundedCheckboxProps>(
  ({ checked, className, disabled, label, onChange }, ref) => {
    return (
      <div className={cn('flex items-end gap-4 ', className)}>
        <Checkbox
          checked={checked}
          className={'rounded-full'}
          disabled={disabled}
          onCheckedChange={onChange}
          ref={ref}
        >
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
