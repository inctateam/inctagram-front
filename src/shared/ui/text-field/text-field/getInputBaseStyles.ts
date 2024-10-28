export const getInputBaseStyles = (error?: boolean) => {
  return [
    'text-base font-normal text-light-100 placeholder:text-light-900 bg-transparent border border-solid border-dark-100 rounded-sm w-full px-3 py-1.5',
    'hover:border-light-900',
    error && 'border-danger-500 hover:border-danger-300',
    'active:border-accent-500',
    error && 'active:border-danger-500',
    'focus-visible:border-accent-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent-500',
    error && 'focus-visible:border-danger-500 focus-visible:outline-danger-500',
    'disabled:text-dark-100 disabled:border-dark-100 disabled:placeholder:text-dark-100',
  ]
}
