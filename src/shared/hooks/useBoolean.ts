import { useState } from 'react'

const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  const toggle = () => setValue(prev => !prev)

  return [value, { setFalse, setTrue, toggle }] as const
}

export default useBoolean
