import { ArrowIosBackOutline } from '@/assets/icons/components'
import { cn } from '@/shared/utils'

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
        <ArrowIosBackOutline className={cn(currentPage === 1 && 'text-dark-100')} />
      </button>
      {startPage > 1 && (
        <>
          <button
            className={'hover:bg-dark-500 text-sm w-6 h-6'}
            onClick={() => setCurrentPage(1)}
            type={'button'}
          >
            1
          </button>
          {startPage > 2 && <span className={'w-6 h-6 pl-1.5'}>...</span>}
        </>
      )}
    </>
  )
}
