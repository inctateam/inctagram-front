import { Avatar, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

type CurrentUserProps = {
  className?: string
  src?: string
  userName?: string
}
const CurrentUser = (props: CurrentUserProps) => {
  const { className, src, userName = 'Ekaterina Ivanova' } = props

  return (
    <div className={cn('flex justify-start items-center gap-3 bg-dark-500', className)}>
      <Avatar alt={'user avatar'} size={12} src={src} />
      <Typography variant={'regular16'}>{userName}</Typography>
    </div>
  )
}

export default CurrentUser
