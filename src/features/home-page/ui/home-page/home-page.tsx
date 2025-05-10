'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useMeQuery } from '@/features/auth/api'
import { usePublicationsFollowersQuery } from '@/features/home-page/api'
import Publication from '@/features/home-page/ui/home-page/publication/publication'
import { ProgressBar } from '@/shared/ui'
import { formatDistanceToNow } from 'date-fns'

const INITIAL_CURSOR = 0
const INITIAL_PAGE_SIZE = 4

export const HomePage = () => {
  const [cursor, setCursor] = useState(INITIAL_CURSOR)
  const { data: me } = useMeQuery()
  const {
    data: fetchedPublications,
    isError,
    isFetching,
    isLoading,
  } = usePublicationsFollowersQuery(
    { endCursorPostId: cursor, pageSize: INITIAL_PAGE_SIZE },
    { refetchOnMountOrArgChange: true }
  )

  const [publications, setPublications] = useState(fetchedPublications?.items || [])

  // Обновление локального состояния, если пришли новые публикации
  useEffect(() => {
    if (fetchedPublications?.items) {
      if (Array.isArray(fetchedPublications?.items)) {
        setPublications(prev => [...prev, ...fetchedPublications.items!])
      }
    }
  }, [fetchedPublications?.items])

  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching || !fetchedPublications?.nextCursor) {
        return
      }

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setCursor(fetchedPublications.nextCursor!)
          }
        },
        { threshold: 0.1 }
      )

      if (node) {
        observer.current.observe(node)
      }
    },
    [isFetching, fetchedPublications?.nextCursor]
  )

  const handleLikeToggle = (postId: number) => {
    setPublications(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likesCount: p.likesCount + (p.isLiked ? -1 : 1) }
          : p
      )
    )
  }

  if (isError) {
    return <div className={'text-red-500 text-center'}>🚫 ERROR! Posts not found!</div>
  }

  if (publications.length === 0 && !isLoading) {
    return (
      <div className={'flex w-full justify-center items-start text-light-900'}>
        There are no publications yet 🙁
      </div>
    )
  }

  return (
    <div className={'flex flex-col w-full justify-center items-center gap-6'}>
      {(isLoading || isFetching) && <ProgressBar />}
      {publications.map((publication, index, arr) => {
        const timeAgo = formatDistanceToNow(new Date(publication.createdAt), { addSuffix: true })
        const postImages = publication.images.map(i => i.url)
        const isLast = index === arr.length - 1

        return (
          <div key={`${publication.id}-${index}`} ref={isLast ? lastItemRef : null}>
            <Publication
              me={me}
              onToggleLike={() => handleLikeToggle(publication.id)}
              postImages={postImages}
              publication={publication}
              timeAgo={timeAgo}
            />
          </div>
        )
      })}
    </div>
  )
}
