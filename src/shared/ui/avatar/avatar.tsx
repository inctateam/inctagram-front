import { useState } from 'react'

import { MainAvatar } from './main-avatar'
import { ModalForDeletingAvatar } from './modal-for-deleting-avatar'
import { ModalWithoutAvatar } from './modal-for-uploading-avatar'
import { ModalWithAvatar } from './modal-with-avatar'

type Props = {
  size: string
}

export const Avatar = ({ size }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<'' | 'maxSizeError' | 'validFormatsError'>('')
  const [base64Image, setBase64Image] = useState('')

  return (
    <div>
      {/*Основное отображение аватара*/}
      <MainAvatar
        base64Image={base64Image}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setIsModalOpen={setIsModalOpen}
        size={size}
      />
      {/*Модальное окно при удалении аватара*/}
      {isDeleteModalOpen && (
        <ModalForDeletingAvatar
          setBase64Image={setBase64Image}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {/*Модальное окно при добавлении аватара*/}
      {isModalOpen && (
        <div className={'fixed inset-0 flex justify-center items-center bg-dark-700 bg-opacity-50'}>
          {base64Image ? (
            <ModalWithAvatar
              base64Image={base64Image}
              setBase64Image={setBase64Image}
              setErrorMessage={setErrorMessage}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <ModalWithoutAvatar
              base64Image={base64Image}
              errorMessage={errorMessage}
              setBase64Image={setBase64Image}
              setErrorMessage={setErrorMessage}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>
      )}
    </div>
  )
}
