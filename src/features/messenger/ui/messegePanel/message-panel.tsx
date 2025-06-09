import { useCallback, useEffect, useRef } from 'react'

import { useGetMessagesByUserQuery } from '@/features/messenger/api/messenger-api'
import { Message } from '@/features/messenger/types'
import UserMessageItem from '@/features/messenger/ui/messegePanel/user-message-item'
import { ProgressBar, ScrollArea, Typography } from '@/shared/ui'

const MESSAGES_LIMIT = 12

type Props = {
  cursor: number | undefined
  deleteMessage: (id: number) => void
  dialoguePartnerId?: number
  meId: number
  onEditMessage: (editMessage: Message) => void
  setCursor: (val: number) => void
  userAvatar: string
}

export const MessagePanel = ({
  cursor,
  deleteMessage,
  dialoguePartnerId,
  meId,
  onEditMessage,
  setCursor,
  userAvatar,
}: Props) => {
  const { data: dialogData, isFetching } = useGetMessagesByUserQuery(
    {
      dialoguePartnerId: dialoguePartnerId!,
      meId: meId!,
      params: { cursor, pageSize: MESSAGES_LIMIT },
    },
    { skip: dialoguePartnerId === null || meId === undefined }
  )

  const observer = useRef<IntersectionObserver | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const scrollPositions = useRef<Record<number, number>>({})
  const prevScrollTopRef = useRef(0)
  const prevScrollHeightRef = useRef(0)
  const lastMessageIdRef = useRef<null | number>(null)

  // Сохраняем позицию скролла при смене диалога
  useEffect(() => {
    const currentScrollPositions = scrollPositions.current
    const currentDialogueId = dialoguePartnerId
    const currentViewportRef = viewportRef.current

    return () => {
      if (currentViewportRef && currentDialogueId) {
        currentScrollPositions[currentDialogueId] = currentViewportRef.scrollTop
      }
    }
  }, [dialoguePartnerId])

  // После загрузки сообщений — восстанавливаем/компенсируем скролл
  useEffect(() => {
    const viewportEl = viewportRef.current

    if (!viewportEl || !dialogData?.items.length) {
      return
    }
    const lastMessage = dialogData.items[dialogData.items.length - 1]

    // если появился новый ID, которого не было до этого
    if (lastMessage.id !== lastMessageIdRef.current) {
      lastMessageIdRef.current = lastMessage.id
      requestAnimationFrame(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = viewportRef.current.scrollHeight
        }
      })
    }
    const savedScroll = scrollPositions.current[dialoguePartnerId!]

    if (savedScroll !== undefined && cursor === undefined) {
      // Смена диалога — восстановить сохранённый scroll
      viewportEl.scrollTop = savedScroll
    } else if (cursor !== undefined) {
      // Подгрузка новых сообщений — компенсировать смещение
      const newScrollHeight = viewportEl.scrollHeight
      const scrollDiff = newScrollHeight - prevScrollHeightRef.current

      viewportEl.scrollTop = prevScrollTopRef.current + scrollDiff
    } else {
      // Первая загрузка — прокрутить вниз
      viewportEl.scrollTop = viewportEl.scrollHeight
    }
  }, [dialogData?.items, cursor, dialoguePartnerId])

  // Реф для верхнего сообщения (наблюдение за появлением)
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
            const lastItemId = dialogData?.items[0]?.id

            if (lastItemId && viewportRef.current) {
              // Сохраняем текущий scrollTop и scrollHeight
              prevScrollTopRef.current = viewportRef.current.scrollTop
              prevScrollHeightRef.current = viewportRef.current.scrollHeight
              // Запрашиваем следующую порцию
              setCursor(lastItemId)
            }
          }
        },
        { threshold: 1 }
      )

      if (node) {
        observer.current.observe(node)
      }
    },
    [dialogData?.items, isFetching, setCursor]
  )

  return (
    <ScrollArea className={'h-[33rem] mt-6 overflow-y-hidden'} viewportRef={viewportRef}>
      {isFetching && <ProgressBar />}
      {dialoguePartnerId ? (
        <div className={'flex flex-col flex-grow gap-6 px-6 mb-16 bg-dark-700'}>
          {!dialogData?.items.length && !isFetching ? (
            <Typography className={'text-light-900 text-center'} variant={'regular16'}>
              There are no messages
            </Typography>
          ) : (
            dialogData?.items.map((d, i) => (
              <UserMessageItem
                deleteMessage={deleteMessage}
                dialogItem={d}
                key={d.id}
                meId={meId}
                onEditMessage={onEditMessage}
                ref={i === 0 ? setLastItemRef : null}
                userAvatar={userAvatar}
              />
            ))
          )}
        </div>
      ) : (
        <div className={'flex justify-center items-center h-[33rem] mt-5'}>
          <Typography className={'text-light-900'} variant={'regular16'}>
            Start a chat with the user from the list
          </Typography>
        </div>
      )}
    </ScrollArea>
  )
}
