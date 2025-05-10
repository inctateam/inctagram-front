import Messenger from '@/features/messenger/ui/messenger'
import { Typography } from '@/shared/ui'

export default function MessengerPage() {
  return (
    <div className={'flex flex-col gap-3'}>
      <Typography variant={'h1'}>Messenger</Typography>
      <Messenger />
    </div>
  )
}
