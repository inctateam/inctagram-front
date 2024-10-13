import { useRef } from 'react'

import { ImageOutline } from '@/assets/icons/components'
import Image from 'next/image'

import { Button } from '../button'
import { ErrorMessage } from './error-message'
import { HeaderForModal } from './header-for-modal'
import { useUploadFileHandler } from './use-upload-file-handler'

type Props = {
  base64Image: string
  errorMessage: '' | 'maxSizeError' | 'validFormatsError'
  setBase64Image: (setImage: string) => void
  setErrorMessage: (errorMessage: '' | 'maxSizeError' | 'validFormatsError') => void
  setIsModalOpen: (isOpen: boolean) => void
}

export const ModalWithoutAvatar = ({
  base64Image,
  errorMessage,
  setBase64Image,
  setErrorMessage,
  setIsModalOpen,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFileHandler = useUploadFileHandler(setErrorMessage, setBase64Image)

  return (
    <>
      <div className={'border border-dark-100 bg-dark-300 w-[492px] h-[564px] rounded-sm'}>
        <HeaderForModal
          setBase64Image={setBase64Image}
          setErrorMessage={setErrorMessage}
          setIsModalOpen={setIsModalOpen}
        />
        <div className={'flex flex-col justify-center items-center pt-[72px]'}>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <div
            className={
              'w-[222px] h-[228px] bg-dark-500 flex items-center justify-center rounded-sm mb-[60px]'
            }
          >
            {base64Image ? (
              <Image alt={'Avatar'} src={base64Image} />
            ) : (
              <ImageOutline className={'size-12'} />
            )}
          </div>
          <Button
            className={'h-9 w-[219px] bg-accent-500 font-semibold text-base rounded-sm'}
            onClick={() => fileInputRef.current?.click()}
            type={'button'}
          >
            Select from Computer
          </Button>
          <input
            className={'hidden'}
            onChange={uploadFileHandler}
            ref={fileInputRef}
            type={'file'}
          />
        </div>
      </div>
    </>
  )
}
