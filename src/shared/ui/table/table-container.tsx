import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const TableContainer = ({ children }: Props) => {
  return <table className={'w-[972px] mx-auto'}>{children}</table>
}
