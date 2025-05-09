'use client'
import { ChangeEvent, useState } from 'react'

import { SearchTextField } from '@/shared/ui'
import { cn } from '@/shared/utils'

type Props = {
  className?: string
}
const SearchUserPanel = (props: Props) => {
  const { className } = props
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={cn('flex items-center px-3 py-4 h-[4.5rem] bg-dark-500', className)}>
      <SearchTextField onChange={handleChange} value={searchValue} />
    </div>
  )
}

export default SearchUserPanel
