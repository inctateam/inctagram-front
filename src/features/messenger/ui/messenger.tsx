'use client'
import { useState } from 'react'

import { useMeQuery } from '@/features/auth/api'
import {
  useGetLatestMessagesQuery,
  useSendMessageMutation,
} from '@/features/messenger/api/messenger-api'
import { LatestMessage } from '@/features/messenger/types'
import UserItem from '@/features/messenger/ui/UserItem/userItem'
import CurrentUser from '@/features/messenger/ui/messegePanel/currentUser/currentUser'
import MessagePanel from '@/features/messenger/ui/messegePanel/messagePanel'
import MessengerInput from '@/features/messenger/ui/messegePanel/messangerInput/MessangerInput'
import SearchUserInput from '@/features/messenger/ui/searchUserPanel/searchUserInput'
import { PATH } from '@/shared/constants'
import { ProgressBar, ScrollArea, Spinner } from '@/shared/ui'
import { useRouter } from 'next/navigation'

const Messenger = () => {
  const router = useRouter()
  const [sendMessageTrigger] = useSendMessageMutation()
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const { data: meData, isLoading: meIsLoading } = useMeQuery()
  const meId = meData?.userId
  const [currentUser, setCurrentUser] = useState<LatestMessage | null>(null)
  const [dialoguePartnerId, setDialoguePartnerId] = useState<number | undefined>(undefined)
  const {
    data: latestMessages,
    isFetching: latestMessagesIsFetching,
    isLoading: latestMessagesIsLoading,
  } = useGetLatestMessagesQuery({ params: {} })

  const onUserItemClick = (selectedUser: LatestMessage) => {
    if (!meData) {
      return
    }
    const dialoguePartnerId =
      meId === selectedUser.ownerId ? selectedUser.receiverId : selectedUser.ownerId

    setCurrentUser(selectedUser)
    setDialoguePartnerId(dialoguePartnerId)
    setCursor(undefined) // сброс курсора при выборе нового пользователя
  }

  const sendMessage = async (
    message: string,
    isVoice: boolean = false,
    audioBuffer?: Uint8Array
  ) => {
    if (!dialoguePartnerId) {
      return
    }

    if (isVoice && audioBuffer) {
      await sendMessageTrigger({ audioBuffer, isVoice, message: '', receiverId: dialoguePartnerId })
    } else {
      await sendMessageTrigger({ message, receiverId: dialoguePartnerId })
    }
  }

  if (latestMessagesIsLoading || meIsLoading) {
    return <Spinner />
  }
  if (!meData) {
    router.push(PATH.SIGN_IN)
  }

  return (
    <div
      className={'flex border border-dark-300 rounded-sm h-[630px] w-[972px]'}
      // onBlur={() => setCurrentUser(null)}
    >
      {latestMessagesIsFetching && <ProgressBar />}
      {/*{(latestMessagesIsFetching || dialogDataIsLoading) && <ProgressBar />}*/}
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
            <CurrentUser src={currentUser?.avatars[0]?.url || ''} userName={currentUser.userName} />
          )}
        </div>
        <div className={'flex flex-col overflow-y-hidden'}>
          <MessagePanel
            cursor={cursor}
            dialoguePartnerId={dialoguePartnerId}
            meId={meId!}
            setCursor={setCursor}
            userAvatar={currentUser?.avatars[1]?.url || ''}
          />
          <div
            className={
              'flex justify-between items-center h-12 px-6 py-3 gap-3 border-t border-dark-300'
            }
          >
            {dialoguePartnerId && <MessengerInput sendMessage={sendMessage} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messenger
