'use client'
import { ChangeEvent, useState } from 'react'

import { SearchTextField } from '@/shared/ui'
import { cn } from '@/shared/utils'

type Props = {
  className?: string
}
const SearchUserInput = (props: Props) => {
  const { className } = props
  const [searchUserName, setSearchUserName] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserName(e.target.value)
  }

  return (
    <div className={cn('flex items-center bg-dark-500', className)}>
      <SearchTextField onChange={handleChange} value={searchUserName} />
    </div>
  )
}

export default SearchUserInput
