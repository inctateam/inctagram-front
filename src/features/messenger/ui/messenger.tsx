'use client'
import { useEffect, useState } from 'react'

import { useGetLatestMessagesQuery } from '@/features/messenger/api/messenger-api'
import { LatestMessage, Message, MessageSendRequest } from '@/features/messenger/types'
import UserItem from '@/features/messenger/ui/UserItem/userItem'
import MessagePanel, {
  CurrentUser,
  MessageInput,
} from '@/features/messenger/ui/messegePanel/messagePanel'
import SearchUserInput from '@/features/messenger/ui/searchUserPanel/searchUserInput'
import socket from '@/services/socket'
import { WS_EVENTS_PATH } from '@/shared/constants/socket-events'
import { ScrollArea } from '@/shared/ui'

const Messenger = () => {
  const { data: latestMessages } = useGetLatestMessagesQuery({ params: {} })

  console.log('latestMessages', latestMessages)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentUser, setCurrentUser] = useState<LatestMessage | null>(null)
  const onUserItemClick = (selectedUser: LatestMessage) => {
    setCurrentUser(selectedUser)
  }

  useEffect(() => {
    // подключение и слушатели
    socket.on(WS_EVENTS_PATH.RECEIVE_MESSAGE, (message: Message) => {
      console.log('RECEIVE_MESSAGE')
      setMessages(prev => [...prev, message])
    })

    socket.on(WS_EVENTS_PATH.MESSAGE_SEND, (message: Message) => {
      // обработка нового сообщения от другого пользователя
      console.log('MESSAGE_SEND')
      setMessages(prev => [...prev, message])
    })

    socket.on(WS_EVENTS_PATH.UPDATE_MESSAGE, (updatedMessage: Message) => {
      setMessages(prev => prev.map(msg => (msg.id === updatedMessage.id ? updatedMessage : msg)))
    })

    socket.on(WS_EVENTS_PATH.MESSAGE_DELETED, (id: number) => {
      setMessages(prev => prev.filter(msg => msg.id !== id))
    })

    socket.on(WS_EVENTS_PATH.ERROR, err => {
      console.error('WebSocket error:', err)
    })

    return () => {
      socket.off() // отключение всех слушателей при размонтировании
    }
  }, [])

  const sendMessage = (text: string) => {
    console.log('send:', text)
    // if (!currentUser) {
    //   return
    // }
    const testMessage = 'Hello'
    const testId = 2061
    const message: MessageSendRequest = { message: testMessage, receiverId: testId }

    socket.emit(WS_EVENTS_PATH.MESSAGE_SEND, message, (ack: any) => {
      console.log('Acknowledged:', ack)
    })
  }

  return (
    <div
      className={'flex border border-dark-300 rounded-sm h-[630px] w-[972px]'}
      onBlur={() => setCurrentUser(null)}
    >
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
          <MessagePanel dialogData={messages} />
          <MessageInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  )
}

export default Messenger
