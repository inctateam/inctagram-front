import { ReactNode } from 'react'

type Props = {
  align?: 'left' | 'right'
  children: ReactNode
}

export const TableCell = ({ align, children }: Props) => {
  return (
    <td className={`py-3 w-48 ${align === 'right' ? 'text-right pr-20' : 'text-left'} pl-5`}>
      {children}
    </td>
  )
}
