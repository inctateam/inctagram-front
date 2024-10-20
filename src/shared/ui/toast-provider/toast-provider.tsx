import { ComponentPropsWithoutRef } from 'react'
import { CloseButton, ToastContainer } from 'react-toastify'

import { CloseOutline } from '@/assets/icons'
import { IconButton } from '@/shared/ui'

export const ToastProvider = () => {
  return (
    <ToastContainer
      autoClose={false}
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
  <span>
    <IconButton onClick={closeToast}>
      <CloseOutline />
    </IconButton>
  </span>
)
