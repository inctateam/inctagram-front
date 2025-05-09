import UserItem from '@/features/messenger/ui/UserItem/userItem'
import MessegePanel, {
  CurrentUser,
  MessegeInput,
} from '@/features/messenger/ui/messegePanel/messegePanel'
import SearchUserPanel from '@/features/messenger/ui/searchUserPanel/searchUserPanel'
import { ScrollArea } from '@/shared/ui'

const Messenger = () => {
  return (
    <div className={'flex border border-dark-300 rounded-sm h-[600px] w-[972px]'}>
      <div className={'flex flex-col h-full w-[22.5rem] overflow-y-hidden'}>
        <SearchUserPanel />
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
        <MessegePanel />
        <MessegeInput />
      </div>
    </div>
  )
}

export default Messenger
