import { ComponentPropsWithoutRef } from 'react'
import { CloseButton, ToastContainer } from 'react-toastify'

import { CloseOutline } from '@/assets/icons'
import { IconButton } from '@/shared/ui'

import './react-toastify.css'

export const ToastProvider = () => {
  return (
    <ToastContainer
      autoClose={5000}
      closeButton={CustomCloseButton}
      closeOnClick
      draggable
      hideProgressBar={false}
      icon={false}
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position={'top-right'}
      rtl={false}
      theme={'colored'}
    />
  )
}

const CustomCloseButton = ({
  closeToast,
}: {
  closeToast: ComponentPropsWithoutRef<typeof CloseButton>['closeToast']
}) => (
  <span className={'self-center'}>
    <IconButton className={'hover:bg-opacity-60 p-1'} onClick={closeToast}>
      <CloseOutline />
    </IconButton>
  </span>
)
