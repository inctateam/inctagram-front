'use client'
import { useState } from 'react'

import { LatestMessage } from '@/features/messenger/types'
import UserItem from '@/features/messenger/ui/UserItem/userItem'
import MessagePanel, {
  CurrentUser,
  MessageInput,
} from '@/features/messenger/ui/messegePanel/messagePanel'
import SearchUserInput from '@/features/messenger/ui/searchUserPanel/searchUserInput'
import { ScrollArea } from '@/shared/ui'

import { dialogMessagesData } from '../mockData/dialogData'
import { latestMessages } from '../mockData/mockMessagesData'

const Messenger = () => {
  const [currentUser, setCurrentUser] = useState<LatestMessage | null>(null)
  const onUserItemClick = (selectedUser: LatestMessage) => {
    setCurrentUser(selectedUser)
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
          {latestMessages.items.map((m: LatestMessage) => {
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
          <MessagePanel dialogData={dialogMessagesData.items} />
          <MessageInput />
        </div>
      </div>
    </div>
  )
}

export default Messenger
