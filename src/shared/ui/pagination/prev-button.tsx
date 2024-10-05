import { ArrowIosBackOutline } from '@/assets/icons/components'

type Props = {
  currentPage: number
  setCurrentPage: (setPage: number) => void
  startPage: number
}

export const PrevButton = ({ currentPage, setCurrentPage, startPage }: Props) => {
  const prevPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <button disabled={currentPage === 1} onClick={prevPageHandler} type={'button'}>
        {currentPage >= 2 ? (
          <ArrowIosBackOutline className={'size-4'} />
        ) : (
          <ArrowIosBackOutline className={'text-dark-100'} />
        )}
      </button>
      {startPage > 1 && (
        <>
          <button
            className={'hover:bg-dark-500 text-[14px] w-[24px] h-[24px]'}
            onClick={() => setCurrentPage(1)}
            type={'button'}
          >
            1
          </button>
          {startPage > 2 && <span className={'w-[24px] h-[24px] pl-1.5'}>...</span>}
        </>
      )}
    </>
  )
}
