import { useId } from 'react'

export const useGenerateId = (id: string | undefined) => {
  const reactId = useId()

  return id || reactId
}
