import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'table'>

export const TableRoot = forwardRef<ElementRef<'table'>, Props>(({ ...props }, ref) => {
  return <table ref={ref} {...props} />
})
