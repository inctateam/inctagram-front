import { ChangeEvent, ComponentPropsWithoutRef, forwardRef } from 'react'

import { useGenerateId } from '@/shared/hooks'
import { Label, Typography } from '@/shared/ui'
import { getInputBaseStyles } from '@/shared/ui/text-field/text-field/getInputBaseStyles'
import { cn } from '@/shared/utils'

type TextareaOwnProps = {
  autoResize?: boolean
  className?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  id?: string
  label?: string
}

type TextareaProps = Omit<ComponentPropsWithoutRef<'textarea'>, keyof TextareaOwnProps> &
  TextareaOwnProps

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    autoResize,
    className,
    disabled,
    error,
    helperText,
    id: textareaId,
    label,
    onChange,
    ...restProps
  } = props

  const id = useGenerateId(textareaId)
  const helperTextId = useGenerateId() + '-feedback'

  const handleResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      handleResize(e)
    }
    onChange?.(e)
  }

  const styles = {
    helperText: cn('text-light-900', error && 'text-danger-500', disabled && 'text-dark-100'),
    label: cn('text-light-900', disabled && 'text-dark-100'),
    textarea: cn(
      'min-h-[84px]',
      autoResize && 'overflow-hidden resize-none',
      getInputBaseStyles(error),
      className
    ),
  }

  return (
    <div className={'flex flex-col w-full'}>
      {label && (
        <Typography as={Label} className={styles.label} htmlFor={id} variant={'regular14'}>
          {label}
        </Typography>
      )}
      <textarea
        aria-describedby={helperText ? helperTextId : undefined}
        aria-invalid={error ? 'true' : undefined}
        className={styles.textarea}
        disabled={disabled}
        id={id}
        onChange={handleChange}
        {...restProps}
        ref={ref}
      />
      {helperText && (
        <Typography
          aria-live={helperText ? 'polite' : undefined}
          className={styles.helperText}
          id={helperText ? helperTextId : undefined}
          variant={'regular14'}
        >
          {helperText}
        </Typography>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export { Textarea, type TextareaProps }
