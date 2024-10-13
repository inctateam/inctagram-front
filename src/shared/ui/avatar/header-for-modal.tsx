import { CloseOutline } from '@/assets/icons/components'

type Props = {
  setBase64Image: (image: string) => void
  setErrorMessage: (errorMessage: '' | 'maxSizeError' | 'validFormatsError') => void
  setIsModalOpen: (isOpen: boolean) => void
}

export const HeaderForModal = ({ setBase64Image, setErrorMessage, setIsModalOpen }: Props) => {
  const closeModalHandler = () => {
    setIsModalOpen(false)
    setErrorMessage('')
    setBase64Image('')
  }

  return (
    <div className={'border-b border-dark-100 h-[60px] flex justify-between items-center px-6'}>
      <span className={'text-xl font-bold'}>Add a Profile Photo</span>
      <button onClick={closeModalHandler} type={'button'}>
        <CloseOutline className={'size-6'} />
      </button>
    </div>
  )
}
