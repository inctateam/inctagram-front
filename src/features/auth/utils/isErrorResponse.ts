type ErrorResponse = {
  data: {
    error: string
    messages: string
    statusCode: number
  }
  status: number
}

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'messages' in error.data &&
    typeof error.data.messages === 'string'
  )
}
