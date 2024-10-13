import { CloseOutline } from '@/assets/icons/components'

import { Button } from '../button'

type Props = {
  setBase64Image: (setImage: string) => void
  setIsDeleteModalOpen: (deleteIsOpen: boolean) => void
}

export const ModalForDeletingAvatar = ({ setBase64Image, setIsDeleteModalOpen }: Props) => {
  const deletePhotoHandler = () => {
    setBase64Image('')
    setIsDeleteModalOpen(false)
  }

  return (
    <div className={'fixed inset-0 flex justify-center items-center bg-dark-900 bg-opacity-50'}>
      <div className={'w-[438px] h-60 bg-dark-300 rounded-sm'}>
        <div
          className={
            'flex items-center justify-between px-6 border-b-[1px] border-dark-100 h-[60px]'
          }
        >
          <span className={'text-xl font-bold'}>Delete Photo</span>
          <button onClick={() => setIsDeleteModalOpen(false)} type={'button'}>
            <CloseOutline className={'size-6'} />
          </button>
        </div>
        <div className={'flex px-6 relative h-[181px]'}>
          <span className={'text-base font-normal absolute top-[30px]'}>
            Are you sure you want to delete the photo?
          </span>
          <div className={'flex absolute bottom-9 right-6 gap-6'}>
            <Button
              className={'w-24'}
              onClick={deletePhotoHandler}
              type={'button'}
              variant={'outline'}
            >
              Yes
            </Button>
            <Button
              className={
                'w-24 h-9 border border-accent-500 rounded-sm bg-accent-500 text-base font-semibold'
              }
              onClick={() => setIsDeleteModalOpen(false)}
              type={'button'}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
