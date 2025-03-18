import { useCallback, useEffect, useRef, useState } from 'react'

import { useGetNotificationsQuery } from '@/features/notifications/api/notifications.api'
import { ScrollArea, Typography } from '@/shared/ui'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { formatDistanceToNow } from 'date-fns'

const NOTIFICATIONS_LIMIT = 5

type Props = {
  setNotReading: (count: number) => void
}
export const NotificationsContent = ({ setNotReading }: Props) => {
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const { data: notifications, isFetching } = useGetNotificationsQuery({
    cursor,
    pageSize: NOTIFICATIONS_LIMIT,
    sortBy: 'createdAt',
  })

  useEffect(() => {
    if (notifications?.notReadCount !== undefined) {
      setNotReading(notifications.notReadCount)
    }
  }, [notifications?.notReadCount, setNotReading])

  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useRef<HTMLDivElement | null>(null)

  const setLastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) {
        return
      }

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            const lastItemId = notifications?.items[notifications.items.length - 1]?.id

            if (lastItemId) {
              setCursor(lastItemId)
            }
          }
        },
        { threshold: 0.2 }
      )

      if (node) {
        observer.current.observe(node)
      }
    },
    [notifications, isFetching]
  )

  return (
    <DropdownMenuPrimitive.Content
      align={'end'}
      className={
        'z-50 p-4 translate-x-3 w-[355px] h-[440px] bg-dark-500 rounded-md border border-dark-100'
      }
    >
      <div
        className={
          'absolute -top-2 right-5 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-dark-100'
        }
      ></div>
      <div
        className={
          'absolute -top-[5px] right-[21px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-dark-500'
        }
      ></div>

      <Typography className={'mb-4'} variant={'h3'}></Typography>
      <Typography className={'mb-4'} variant={'h3'}>
        Notifications
      </Typography>
      <ScrollArea className={'h-[350px] w-[330px]'} viewportRef={lastItemRef}>
        {notifications?.items.map((item, i) => (
          <DropdownMenuPrimitive.Item
            className={
              'relative flex items-center text-sm pr-1' +
              (i < notifications?.items.length - 1 ? ' border-b border-dark-100' : '') +
              (i === 0 ? ' border-t border-dark-100' : '')
            }
            key={i}
            ref={i === notifications?.items.length - 1 ? setLastItemRef : null}
          >
            <div>
              <div className={'flex items-center gap-1 mt-3'}>
                <Typography className={'font-bold'} variant={'medium14'}>
                  New notification!
                </Typography>
                {!item.isRead && (
                  <Typography className={'text-accent-500'} variant={'small'}>
                    New
                  </Typography>
                )}
              </div>
              <Typography>{item.message}</Typography>
              <Typography className={'text-xs text-light-900 mb-3'}>
                {formatDistanceToNow(item.createdAt)}
              </Typography>
            </div>
          </DropdownMenuPrimitive.Item>
        ))}
        {isFetching && <Typography>Загружаем...</Typography>}
      </ScrollArea>
    </DropdownMenuPrimitive.Content>
  )
}
