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

import { latestMessages } from '../mockData/mockMessagesData'

const Messenger = () => {
  const [currentUser, setCurrentUser] = useState<null | string>(null)

  return (
    <div className={'flex border border-dark-300 rounded-sm h-[600px] w-[972px]'}>
      <div className={'flex flex-col h-full w-[24rem] border-r border-dark-300 overflow-y-hidden'}>
        <SearchUserPanel className={'border-b border-dark-300'} />
        <ScrollArea className={'overflow-y-hidden'}>
          {latestMessages.items.map((m: LatestMessage) => {
            return <UserItem key={m.id} lastMessage={m} />
          })}
        </ScrollArea>
      </div>
      <div className={'flex flex-col w-full'}>
        <div className={'h-[5.5rem] bg-dark-500 border-b border-dark-300'}>
          {currentUser && <CurrentUser />}
        </div>
        <MessagePanel />
        <MessageInput />
      </div>
    </div>
  )
}

export default Messenger
