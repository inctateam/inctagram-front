'use client'
import { useEffect, useState } from 'react'

import { useMeQuery } from '@/features/auth/api'
import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import {
  useGetLatestMessagesQuery,
  useGetMessagesByUserQuery,
  useSendMessageMutation,
} from '@/features/messenger/api/messenger-api'
import { LatestMessage } from '@/features/messenger/types'
import UserItem from '@/features/messenger/ui/UserItem/userItem'
import MessagePanel, {
  CurrentUser,
  MessageInput,
} from '@/features/messenger/ui/messegePanel/messagePanel'
import SearchUserInput from '@/features/messenger/ui/searchUserPanel/searchUserInput'
import { ProgressBar, ScrollArea, Spinner } from '@/shared/ui'

const Messenger = () => {
  const [sendMessageTrigger] = useSendMessageMutation()
  const { data: meData, isLoading: meIsLoading } = useMeQuery()
  const meId = meData?.userId
  const [currentUser, setCurrentUser] = useState<LatestMessage | null>(null)
  const [dialoguePartnerId, setDialoguePartnerId] = useState<null | number>(null)
  const {
    data: latestMessages,
    isFetching: latestMessagesIsFetching,
    isLoading: latestMessagesIsLoading,
  } = useGetLatestMessagesQuery({ params: {} })
  const {
    data: dialogData,
    // isFetching: dialogDataIsFetching,
    isLoading: dialogDataIsLoading,
  } = useGetMessagesByUserQuery(
    { dialoguePartnerId: dialoguePartnerId!, meId: meId!, params: {} },
    { skip: dialoguePartnerId === null || meId === undefined }
  )

  // console.log('latestMessages', latestMessages)
  // console.log('dialogData', dialogData)

  const onUserItemClick = (selectedUser: LatestMessage) => {
    if (!meData) {
      return
    }
    const dialoguePartnerId =
      meId === selectedUser.ownerId ? selectedUser.receiverId : selectedUser.ownerId

    setCurrentUser(selectedUser)
    setDialoguePartnerId(dialoguePartnerId)
    sessionStorage.setItem('messenger_current_user', JSON.stringify(selectedUser))
  }

  // useEffect(() => {
  //   socket.on(WS_EVENTS_PATH.RECEIVE_MESSAGE, data => {
  //     console.log('Receive message:', data)
  //   })
  //   socket.on(WS_EVENTS_PATH.MESSAGE_SENT, data => {
  //     console.log('MESSAGE_SENT', data)
  //   })
  //   socket.on(WS_EVENTS_PATH.ERROR, err => {
  //     console.error('WebSocket error:', err)
  //   })
  //
  //   return () => {
  //     socket.off()
  //   }
  // }, [])
  useEffect(() => {
    const savedUser = sessionStorage.getItem('messenger_current_user')

    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser))
      } catch (e) {
        handleRequestError(e)
      }
    }
  }, [])
  const sendMessage = (message: string) => {
    if (!dialoguePartnerId) {
      return
    }
    sendMessageTrigger({ message, receiverId: dialoguePartnerId })
  }

  if (latestMessagesIsLoading || meIsLoading || !meData) {
    return <Spinner />
  }

  return (
    <div
      className={'flex border border-dark-300 rounded-sm h-[630px] w-[972px]'}
      // onBlur={() => setCurrentUser(null)}
    >
      {(latestMessagesIsFetching || dialogDataIsLoading) && <ProgressBar />}
      <div className={'flex flex-col h-full w-[24rem] border-r border-dark-300 overflow-y-hidden'}>
        <div
          className={
            'flex justify-center items-center bg-dark-500 border-b h-[5rem] border-dark-300  px-3 py-4'
          }
        >
          <SearchUserInput />
        </div>
        <ScrollArea className={'h-full overflow-y-hidden'}>
          {latestMessages?.items.map((m: LatestMessage) => {
            return <UserItem key={m.id} lastMessage={m} onUserItemClick={onUserItemClick} />
          })}
        </ScrollArea>
      </div>
      <div className={'flex flex-col w-full'}>
        <div className={'flex bg-dark-500 h-[4.75rem] p-3 border-b border-dark-300'}>
          {currentUser && (
            <CurrentUser src={currentUser.avatars[0].url} userName={currentUser.userName} />
          )}
        </div>
        <div className={'flex flex-col overflow-y-hidden'}>
          <MessagePanel
            dialogData={dialogData?.items || []}
            meId={meId!}
            userAvatar={currentUser?.avatars[1].url || ''}
          />
          <MessageInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  )
}

export default Messenger
