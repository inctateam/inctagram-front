import { ArrowIosForwardOutline } from '@/assets/icons'

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
      {/* <Image
        alt={'Right Arrow'}
        height={16}
        src={currentPage === totalPages ? rightArrowBlack : rightArrowWhite}
        width={16}
      /> */}
      {currentPage === totalPages ? (
        <ArrowIosForwardOutline className={'text-dark-100'} />
      ) : (
        <ArrowIosForwardOutline className={'size-4'} />
      )}
    </button>
  )
}
