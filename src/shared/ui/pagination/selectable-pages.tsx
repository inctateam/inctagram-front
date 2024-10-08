type Props = {
  currentPage: number
  endPage: number
  setCurrentPage: (setPage: number) => void
  startPage: number
  totalPages: number
  visiblePages: number
}

export const SelectablePages = ({
  currentPage,
  endPage,
  setCurrentPage,
  startPage,
  totalPages,
  visiblePages,
}: Props) => {
  const pages = Array.from({ length: visiblePages }, (_, index) => startPage + index).filter(
    page => page <= totalPages
  )

  return (
    <>
      {pages.map(page => {
        return (
          <button
            className={`w-6 h-6 text-sm rounded-sm ${
              currentPage === page ? 'bg-light-100 text-dark-900' : 'hover:bg-dark-500 rounded-sm'
            }`}
            key={page}
            onClick={() => setCurrentPage(page)}
            type={'button'}
          >
            {page}
          </button>
        )
      })}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={'w-6 h-6 pl-1.5'}>...</span>}
          <button
            className={'hover:bg-dark-500 text-sm w-6 h-6'}
            onClick={() => setCurrentPage(totalPages)}
            type={'button'}
          >
            {totalPages}
          </button>
        </>
      )}
    </>
  )
}
