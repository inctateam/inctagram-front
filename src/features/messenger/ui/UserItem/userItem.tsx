import { LatestMessage } from '@/features/messenger/types'
import { formatMessageDate } from '@/features/messenger/utils/formatMessageDate'
import { Avatar, Typography } from '@/shared/ui'

type Props = {
  lastMessage?: LatestMessage | undefined
  onUserItemClick?: (lastMessage: LatestMessage) => void
}
const UserItem = (props: Props) => {
  const { lastMessage, onUserItemClick } = props
  const trimMessageText = lastMessage?.messageText
    ? truncate({ text: lastMessage?.messageText })
    : ''

  function truncate({ maxLength = 28, text }: { maxLength?: number; text: string }): string {
    if (text.length <= maxLength) {
      return text
    }

    return text.slice(0, maxLength - 3).trim() + '..'
  }
  const onItemClickHandler = () => {
    if (lastMessage) {
      onUserItemClick?.(lastMessage)
    }
  }

  return (
    <div
      className={
        'flex gap-3 px-3 py-3 bg-dark-500 active:bg-dark-100 hover:bg-dark-100 hover:cursor-pointer'
      }
      onClick={onItemClickHandler}
    >
      <div className={'flex w-12'}>
        <Avatar alt={'user avatar'} size={12} src={lastMessage?.avatars[0]?.url || ''} />
      </div>
      <div className={'flex flex-col w-full justify-between'}>
        <div className={'flex justify-between items-center'}>
          <Typography variant={'regular14'}>{lastMessage?.userName}</Typography>
          <Typography className={'text-light-900'} variant={'small'}>
            {formatMessageDate(lastMessage?.createdAt || '')}
          </Typography>
        </div>
        <Typography className={'text-light-900'} variant={'small'}>
          {trimMessageText}
        </Typography>
      </div>
    </div>
  )
}

export default UserItem
