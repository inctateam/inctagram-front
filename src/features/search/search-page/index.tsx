'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { PATH } from '@/shared/constants'
import { useDebounce } from '@/shared/hooks'
import { Avatar, ScrollArea, SearchTextField, TextLink, Typography } from '@/shared/ui'

import { useGetUsersQuery } from '../api/users-following-followers.api'

const USERS_LIMIT = 12

export const SearchPage = () => {
  const [cursor, setCursor] = useState<number>(0)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 1500)

  // Сбрасываем состояние при изменении поискового запроса
  useEffect(() => {
    setCursor(0) // Сбрасываем курсор при новом поиске
  }, [debouncedSearchValue])
  const { data, isFetching, refetch } = useGetUsersQuery(
    {
      cursor,
      pageSize: USERS_LIMIT,
      search: debouncedSearchValue,
    },
    {
      skip: debouncedSearchValue === '',
    }
  )

  // Очиска кэша при изменении debouncedSearchValue
  useEffect(() => {
    if (debouncedSearchValue) {
      refetch()
    }
  }, [debouncedSearchValue, refetch])
  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useRef<HTMLDivElement | null>(null)

  const setLastItemRef = (node: HTMLDivElement | null) => {
    if (isFetching) {
      return
    }
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          const cursor = data?.items[data.items.length - 1].id

          if (cursor) {
            setCursor(cursor)
          }
        }
      },
      {
        threshold: 0.5,
      }
    )

    if (node) {
      observer.current.observe(node)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={'flex flex-col w-full'}>
      <Typography className={'mb-3'} variant={'h1'}>
        Search
      </Typography>
      <SearchTextField
        autoFocus
        onChange={handleChange}
        placeholder={'Search'}
        value={searchValue}
      />
      <Typography className={'mt-7 mb-4'} variant={'regular16'}>
        Recent requests
      </Typography>

      {data?.items.length ? (
        <ScrollArea className={'h-[350px] w-[450px]'} viewportRef={lastItemRef}>
          <div className={'flex flex-col gap-3'}>
            {data?.items.map((user, index) => (
              <div
                className={'flex items-center gap-3'}
                key={user.id}
                ref={
                  index === data.items.length - 1 &&
                  data.nextCursor !== 0 &&
                  data.items.length >= USERS_LIMIT
                    ? setLastItemRef
                    : null
                }
              >
                <Avatar alt={user.userName} size={12} src={user.avatars[0]?.url} />
                <div className={'flex flex-col'}>
                  <TextLink
                    className={'justify-start'}
                    color={'regular'}
                    href={PATH.PROFILE.replace(':id', user.id.toString())}
                  >
                    {user.userName}
                  </TextLink>
                  <Typography className={'text-light-900'} variant={'regular14'}>
                    {user.firstName} {user.lastName}
                  </Typography>
                </div>
              </div>
            ))}
            {isFetching && <div>Loading more...</div>}
          </div>
        </ScrollArea>
      ) : (
        <div className={'flex flex-col items-center mt-[84px]'}>
          <Typography className={'mb-1  text-light-900 font-bold'} variant={'regular14'}>
            Oops! This place looks empty!
          </Typography>
          <Typography className={'text-light-900'} variant={'small'}>
            No recent requests
          </Typography>
        </div>
      )}
    </div>
  )
}
