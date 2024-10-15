import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const TableBody = ({ children }: Props) => {
  return <tbody>{children}</tbody>
}
