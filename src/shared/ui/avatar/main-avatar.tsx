import { ImageOutline } from '@/assets/icons/components'
import Image from 'next/image'

import { Button } from '../button'
// import deleteIcon from '../images/Delet photo.svg'

type Props = {
  base64Image: string
  setIsDeleteModalOpen: (deleteIsOpen: boolean) => void
  setIsModalOpen: (isOpen: boolean) => void
  size: string
}

export const MainAvatar = ({
  base64Image,
  setIsDeleteModalOpen,
  setIsModalOpen,
  size = '192px',
}: Props) => {
  const deleteModalHandler = () => {
    setIsDeleteModalOpen(true)
  }

  return (
    <div className={'absolute'}>
      <div className={'flex flex-col justify-center items-center'}>
        <div
          className={'rounded-full bg-dark-500 flex justify-center items-center mb-6'}
          style={{ height: size, width: size }}
        >
          {base64Image ? (
            <div className={'relative h-full w-full'}>
              <Image
                alt={'Empty Avatar'}
                className={'object-cover rounded-full'}
                layout={'fill'}
                sizes={'48px'}
                src={base64Image}
              />
              <button
                className={'absolute top-3 right-3'}
                onClick={deleteModalHandler}
                type={'button'}
              ></button>
            </div>
          ) : (
            <ImageOutline className={'size-12'} />
          )}
        </div>
        <Button onClick={() => setIsModalOpen(true)} type={'button'} variant={'outline'}>
          Add a Profile Photo
        </Button>
      </div>
    </div>
  )
}
