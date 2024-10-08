import { ArrowIosForwardOutline } from '@/assets/icons'
import { cn } from '@/shared/utils'

type Props = {
  currentPage: number
  setCurrentPage: (setPage: number) => void
  totalPages: number
}

export const NextButton = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  const nextPageHandler = () => {
    if (currentPage - totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <button disabled={currentPage === totalPages} onClick={nextPageHandler} type={'button'}>
      <ArrowIosForwardOutline className={cn(currentPage === totalPages && 'text-dark-100')} />
    </button>
  )
}
