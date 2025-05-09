import { Avatar, Button, Textarea, Typography } from '@/shared/ui'

const MessegePanel = () => {
  return <div className={'flex flex-grow bg-dark-300'}>Messenger screen</div>
}

export default MessegePanel

type CurrentUserProps = {
  src?: string
  userName?: string
}
export const CurrentUser = (props: CurrentUserProps) => {
  const { src, userName = 'Ekaterina Ivanova' } = props

  return (
    <div className={'flex justify-start items-center p-3 gap-3'}>
      <Avatar alt={'user avatar'} size={12} src={src} />
      <Typography variant={'regular16'}>{userName}</Typography>
    </div>
  )
}

export const MessegeInput = () => {
  return (
    <div className={'flex h-12'}>
      <Textarea autoResize={false} />
      <Button variant={'text'}>Send message</Button>
    </div>
  )
}
