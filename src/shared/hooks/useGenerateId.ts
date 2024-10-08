import { useId } from 'react'

export const useGenerateId = (id?: string) => {
  const reactId = useId()

  return id || reactId
}
