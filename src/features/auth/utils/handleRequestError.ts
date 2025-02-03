import { ErrorOption } from 'react-hook-form'
import { toast } from 'react-toastify'

import { isFetchError } from './isFetchError'
import { isFieldErrorResponse } from './isFieldErrorResponse'

export const handleRequestError = <T>(
  error: unknown,
  setError?: (name: T, error: ErrorOption) => void,
  toastFields?: string[]
) => {
  if (isFetchError(error)) {
    toast.error(error.error)
  } else {
    if (isFieldErrorResponse(error)) {
      error.data.messages.forEach(item => {
        if (toastFields && toastFields.includes(item.field)) {
          toast.error(item.message)
        } else {
          if (setError) {
            setError(item.field as T, { message: item.message, type: 'validationError' })
          }
        }
      })
    } else {
      toast.error('Unknown error')
    }
  }
}
