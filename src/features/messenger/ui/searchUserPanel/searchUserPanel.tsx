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
    <div className={cn('flex px-3 py-4 bg-dark-500 border-r border-dark-300', className)}>
      <SearchTextField onChange={handleChange} value={searchValue} />
    </div>
  )
}

export default SearchUserPanel
