'use client'

import { useCallback, useRef, useState } from 'react'

import { usePublicationsFollowersQuery } from '@/features/home-page/api'
import Publication from '@/features/home-page/ui/home-page/publication/publication'
import { ProgressBar, ScrollArea } from '@/shared/ui'
import { formatDistanceToNow } from 'date-fns'

export const HomePage = () => {
  const [cursor, setCursor] = useState(0)
  const [page, setPage] = useState(1)

  const {
    data: publications,
    isError,
    isFetching,
    isLoading,
  } = usePublicationsFollowersQuery({
    endCursorPostId: cursor,
    pageNumber: page,
    pageSize: 12,
  })

  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching || !publications?.nextCursor || publications.nextCursor === 0) {
        return
      }

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setCursor(publications.nextCursor!)
            setPage(prev => prev + 1)
          }
        },
        { threshold: 0.1 }
      )

      if (node) {
        observer.current.observe(node)
      }
    },
    [isFetching, publications?.nextCursor]
  )

  if (isError) {
    return <div className={'text-red-500 text-center'}>🚫 ERROR! Posts not found!</div>
  }

  if (!publications?.items?.length && !isLoading) {
    return (
      <div className={'flex w-full justify-center items-start text-light-900'}>
        There are no publications yet 🙁
      </div>
    )
  }

  return (
    // <ScrollArea viewportRef={lastItemRef}>
    <div className={'flex flex-col w-full justify-center items-center gap-6'}>
      {(isLoading || isFetching) && <ProgressBar />}
      {publications?.items.map((publication, index) => {
        const isLast = index === publications.items.length - 1
        const timeAgo = formatDistanceToNow(new Date(publication.createdAt), { addSuffix: true })
        const postImages = publication.images.map(i => i.url)

        return (
          <div key={publication.id} ref={isLast ? lastItemRef : null}>
            <Publication postImages={postImages} publication={publication} timeAgo={timeAgo} />
          </div>
        )
      })}
    </div>
    // </ScrollArea>
  )
}
