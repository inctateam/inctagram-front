import toast from 'react-hot-toast'

import { CloseOutline } from '@/assets/icons'
import { IconButton, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

type AlertProp = {
  message: string
  type: 'error' | 'success'
}

const showToast = ({ message, type }: AlertProp) => {
  toast.custom(
    () => (
      <div>
        <Alert message={message} type={type} />
      </div>
    ),
    { duration: Infinity }
  )
}

const Alert = ({ message, type }: AlertProp) => {
  const handleClose = () => {
    toast.dismiss()
  }

  const classNames = cn(
    'flex justify-between items-center w-[387px] h-auto py-[5px] border-[1px] px-6 border-solid rounded-none',
    {
      'bg-danger-900 border-danger-300': type === 'error',
      'bg-success-900 border-success-300': type === 'success',
    }
  )

  return (
    <div className={classNames}>
      <div className={'flex items-center text-wrap'}>
        <Typography variant={'regular16'}>
          {type === 'error' && (
            <Typography as={'strong'} variant={'bold16'}>
              {'Error! '}
            </Typography>
          )}
          {message}
        </Typography>
      </div>
      <div>
        <IconButton onClick={handleClose}>
          <CloseOutline />
        </IconButton>
      </div>
    </div>
  )
}

export { Alert, type AlertProp, showToast }
