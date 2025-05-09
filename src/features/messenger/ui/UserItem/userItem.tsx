import { Avatar, Typography } from '@/shared/ui'

type Props = {
  avatarSrc?: string
  lastMessage?: string
  time?: string
  userName?: string
}
const UserItem = (props: Props) => {
  const {
    avatarSrc,
    lastMessage = 'You: Ahahahah, just kidding..',
    time = '17:33',
    userName = 'Ekaterina Ivanova',
  } = props

  return (
    <div className={'flex w-full gap-3 p-3 bg-dark-500 active:bg-dark-100 hover:bg-dark-100'}>
      <Avatar alt={'user avatar'} size={12} src={avatarSrc} />
      <div className={'flex flex-col justify-between'}>
        <div className={'flex justify-between items-center'}>
          <Typography variant={'regular14'}>{userName}</Typography>
          <Typography className={'text-light-900'} variant={'small'}>
            {time}
          </Typography>
        </div>
        <Typography className={'text-light-900'} variant={'small'}>
          {lastMessage}
        </Typography>
      </div>
    </div>
  )
}

export default UserItem
