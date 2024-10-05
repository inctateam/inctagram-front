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
            className={`w-[24px] h-[24px] text-[14px] rounded-sm ${
              currentPage === page ? 'bg-white text-black' : 'hover:bg-[rgba(23,23,23)] rounded-sm'
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
          {endPage < totalPages - 1 && <span className={'w-[24px] h-[24px] pl-1.5'}>...</span>}
          <button
            className={'hover:bg-[rgba(23,23,23)] text-[14px] w-[24px] h-[24px]'}
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
