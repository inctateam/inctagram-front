import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'tbody'>

export const TableBody = forwardRef<ElementRef<'tbody'>, Props>(({ ...props }, ref) => {
  return <tbody ref={ref} {...props} />
})
