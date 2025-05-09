'use client'
import { useState } from 'react'

import { LatestMessage } from '@/features/messenger/types'
import UserItem from '@/features/messenger/ui/UserItem/userItem'
import MessagePanel, {
  CurrentUser,
  MessageInput,
} from '@/features/messenger/ui/messegePanel/messagePanel'
import SearchUserPanel from '@/features/messenger/ui/searchUserPanel/searchUserPanel'
import { ScrollArea } from '@/shared/ui'

import { dialogMessagesData } from '../mockData/dialogData'
import { latestMessages } from '../mockData/mockMessagesData'

const Messenger = () => {
  const [currentUser, setCurrentUser] = useState<LatestMessage | null>(null)
  const onUserItemClick = (selectedUser: LatestMessage) => {
    setCurrentUser(selectedUser)
  }

  return (
    <div className={'flex border border-dark-300 rounded-sm h-[600px] w-[972px]'}>
      <div className={'flex flex-col h-full w-[24rem] border-r border-dark-300 overflow-y-hidden'}>
        <SearchUserPanel className={'border-b border-dark-300'} />
        <ScrollArea className={'overflow-y-hidden'}>
          {latestMessages.items.map((m: LatestMessage) => {
            return <UserItem key={m.id} lastMessage={m} onUserItemClick={onUserItemClick} />
          })}
        </ScrollArea>
      </div>
      <div className={'flex flex-col w-full'}>
        <div className={'flex bg-dark-500 h-[71px] border-b border-dark-300'}>
          {currentUser && (
            <CurrentUser src={currentUser.avatars[0].url} userName={currentUser.userName} />
          )}
        </div>
        <MessagePanel dialogData={dialogMessagesData.items} />
        <MessageInput />
      </div>
    </div>
  )
}

export default Messenger
