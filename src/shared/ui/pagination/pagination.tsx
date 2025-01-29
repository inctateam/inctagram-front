import { useState } from 'react'

import { NextButton } from './next-button'
import { PrevButton } from './prev-button'
import { SelectList } from './select-list'
import { SelectablePages } from './selectable-pages'

type Props = Record<'initialItemsPerPage' | 'totalItems', number>

export const Pagination = ({ initialItemsPerPage, totalItems }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const visiblePages = currentPage <= 3 || currentPage >= totalPages - 2 ? 5 : 3

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
  let endPage = startPage + visiblePages - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - visiblePages + 1)
  }

  return (
    <div className={'flex justify-center'}>
      <div className={'flex gap-3'}>
        {/*Кнопка переключения на страницу назад*/}
        <PrevButton
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          startPage={startPage}
        />
        {/*Отображение выбираемых страниц*/}
        <SelectablePages
          currentPage={currentPage}
          endPage={endPage}
          setCurrentPage={setCurrentPage}
          startPage={startPage}
          totalPages={totalPages}
          visiblePages={visiblePages}
        />
        {/*Кнопка переключения на страницу вперёд*/}
        <NextButton
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      <SelectList setItemsPerPage={setItemsPerPage} />
    </div>
  )
}
