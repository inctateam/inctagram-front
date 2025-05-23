import { ChangeEvent } from 'react'

type Props = {
  setItemsPerPage: (setItems: number) => void
}

export const SelectList = ({ setItemsPerPage }: Props) => {
  const itemsPerPageHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value))
  }

  return (
    <div className={'flex gap-2 mx-6'}>
      <span>Show</span>
      <select
        className={'border-[1.5px] rounded-sm border-dark-300 bg-dark-500 pl-[6px]'}
        onChange={itemsPerPageHandler}
      >
        {[5, 10, 20, 30, 50, 100].map((page, index) => {
          // {[10, 20, 30, 50, 100].map((page, index) => {
          return (
            <option key={index} value={page}>
              {page}
            </option>
          )
        })}
      </select>
      <span>on page</span>
    </div>
  )
}
