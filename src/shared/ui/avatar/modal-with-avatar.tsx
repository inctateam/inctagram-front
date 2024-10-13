import Image from 'next/image'

import { Button } from '../button'
import { HeaderForModal } from './header-for-modal'

type Props = {
  base64Image: string
  setBase64Image: (setImage: string) => void
  setErrorMessage: (errorMessage: '' | 'maxSizeError' | 'validFormatsError') => void
  setIsModalOpen: (isOpen: boolean) => void
}

export const ModalWithAvatar = ({
  base64Image,
  setBase64Image,
  setErrorMessage,
  setIsModalOpen,
}: Props) => {
  return (
    <div>
      <div className={'border border-dark-100 bg-dark-300 w-[492px] h-[536px] rounded-sm'}>
        <HeaderForModal
          setBase64Image={setBase64Image}
          setErrorMessage={setErrorMessage}
          setIsModalOpen={setIsModalOpen}
        />
        <div className={'flex flex-col justify-center items-center pt-7'}>
          <div className={'w-[332px] h-[340px] relative'}>
            <Image alt={'Avatar'} className={'object-cover'} layout={'fill'} src={base64Image} />
            <div className={'bg-black absolute opacity-70 w-[332px] h-[340px]'}></div>
            <Image
              alt={'Avatar'}
              className={'object-cover'}
              layout={'fill'}
              src={base64Image}
              style={{ clipPath: 'circle(47% at 50% 50%)' }}
            />
            <Button
              className={
                'w-[86px] h-9 bg-accent-500 font-semibold text-[17px] rounded-sm absolute -bottom-[72px] -right-14'
              }
              onClick={() => setIsModalOpen(false)}
              type={'button'}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
