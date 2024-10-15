import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  isHeader?: boolean
}

export const TableRow = ({ children, isHeader }: Props) => {
  return (
    <tr
      className={`text-sm flex justify-between ${isHeader ? 'font-semibold' : 'border border-t-0 border-dark-500'}`}
    >
      {children}
    </tr>
  )
}
