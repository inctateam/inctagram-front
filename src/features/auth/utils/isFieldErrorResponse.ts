type FieldErrorResponse = {
  data: {
    error: string
    messages: { field: string; message: string }[]
    statusCode: number
  }
  status: number
}

export const isFieldErrorResponse = (error: unknown): error is FieldErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'messages' in error.data &&
    typeof error.data.messages !== 'string'
  )
}
