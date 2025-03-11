import { NextButton } from './next-button'
import { PrevButton } from './prev-button'
import { SelectList } from './select-list'
import { SelectablePages } from './selectable-pages'

type Props = {
  currentPage: number
  initialItemsPerPage: number
  onChangeItemsPerPageHandler: (itemsPerPage: number) => void
  onCurrentPageClickHandler: (page: number) => void
  totalItems: number
  totalPages: number
}
export const Pagination = ({
  currentPage,
  onChangeItemsPerPageHandler,
  onCurrentPageClickHandler,
  totalPages,
}: Props) => {
  const visiblePages = Math.min(5, totalPages)

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
  let endPage = startPage + visiblePages - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - visiblePages + 1)
  }

  return (
    <div className={'flex justify-center'}>
      <div className={'flex gap-3'}>
        <PrevButton
          currentPage={currentPage}
          setCurrentPage={onCurrentPageClickHandler}
          startPage={startPage}
        />
        <SelectablePages
          currentPage={currentPage}
          endPage={endPage}
          setCurrentPage={onCurrentPageClickHandler}
          startPage={startPage}
          totalPages={totalPages}
          visiblePages={visiblePages}
        />
        <NextButton
          currentPage={currentPage}
          setCurrentPage={onCurrentPageClickHandler}
          totalPages={totalPages}
        />
      </div>
      <SelectList setItemsPerPage={onChangeItemsPerPageHandler} />
    </div>
  )
}
