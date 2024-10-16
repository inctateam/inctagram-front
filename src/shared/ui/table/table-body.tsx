import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'tbody'>

export const TableBody = forwardRef<ElementRef<'tbody'>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <tbody ref={ref} {...rest} className={className}>
        {children}
      </tbody>
    )
  }
)
