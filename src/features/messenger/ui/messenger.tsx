import UserItem from '@/features/messenger/ui/UserItem/userItem'
import MessagePanel, {
  CurrentUser,
  MessageInput,
} from '@/features/messenger/ui/messegePanel/messagePanel'
import SearchUserPanel from '@/features/messenger/ui/searchUserPanel/searchUserPanel'
import { ScrollArea } from '@/shared/ui'

const Messenger = () => {
  return (
    <div className={'flex border border-dark-300 rounded-sm h-[600px] w-[972px]'}>
      <div className={'flex flex-col h-full w-[22.5rem] overflow-y-hidden'}>
        <SearchUserPanel className={'border-b border-dark-300'} />
        <ScrollArea>
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
        </ScrollArea>
      </div>
      <div className={'flex flex-col w-full'}>
        <CurrentUser />
        <MessagePanel />
        <MessageInput />
      </div>
    </div>
  )
}

export default Messenger
