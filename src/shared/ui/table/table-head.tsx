import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const TableHead = ({ children }: Props) => {
  return <thead className={'bg-dark-500'}>{children}</thead>
}
