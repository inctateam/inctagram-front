import { Checkbox } from '@radix-ui/react-checkbox'
import { cn } from '@/shared/utils'
import { forwardRef } from 'react'
import { RadioButtonChecked, RadioButtonUnchecked } from '@/assets/icons'
import { Textarea } from '../textarea'
import { Typography } from '../typography'

interface RoundedCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  label?: string
}

const RoundedCheckbox = forwardRef<HTMLButtonElement, RoundedCheckboxProps>(
  ({ checked, onChange, className, label }, ref) => {
    return (
      <div className={cn('flex items-end gap-4 ', className)}>
        <Checkbox
          ref={ref}
          checked={checked}
          onCheckedChange={onChange}
          className="rounded-full"
        >
          {checked ? (
            <RadioButtonChecked className="w-5 h-5" />
          ) : (
            <RadioButtonUnchecked className="w-5 h-5" />
          )}
        </Checkbox>
        {label && <Typography className='leading-5'>{label}</Typography>}
      </div>
    )
  }
)

RoundedCheckbox.displayName = 'RoundedCheckbox'

export default RoundedCheckbox
