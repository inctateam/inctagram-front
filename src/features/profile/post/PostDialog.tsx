import EditOutline from '@/assets/icons/components/filled-outlined-pairs/EditOutline'
import HeartOutline from '@/assets/icons/components/filled-outlined-pairs/HeartOutline'
import TrashOutline from '@/assets/icons/components/filled-outlined-pairs/TrashOutline'
import { Avatar, Dialog, DialogBody, DialogHeader, Dropdown, Typography } from '@/shared/ui'
import Image from 'next/image'

type PostDialogProps = {
  onOpenChange: (open: boolean) => void
  open: boolean
}

const PostDialog = (props: PostDialogProps) => {
  const items = [
    {
      icon: <EditOutline />,
      label: 'Edit post',
    },
    {
      icon: <TrashOutline />,
      label: 'Delete post',
    },
  ]

  return (
    <Dialog {...props} closePosition={'none'}>
      <div className={'flex w-[972px]'}>
        <div className={'w-[490px] h-[490px] bg-light-700'}>
          <Image
            alt={'Post Image'}
            height={490}
            src={'https://i.pinimg.com/736x/98/2e/eb/982eeb2e215e5721e026c763215bd641.jpg'}
            width={490}
          />
        </div>
        <div className={'w-[490px]'}>
          <DialogHeader className={'flex justify-between'}>
            <div className={'flex justify-center items-center'}>
              <Avatar
                alt={'User Avatar'}
                size={9}
                src={'https://i.pinimg.com/736x/98/2e/eb/982eeb2e215e5721e026c763215bd641.jpg'}
              />
              <Typography as={'h3'} variant={'h3'}>
                Title Post
              </Typography>
            </div>
            <Dropdown className={'bg-dark-500'} items={items} />
          </DialogHeader>

          <DialogBody>
            <Typography as={'span'} variant={'regular14'}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur atque autem
              commodi cumque earum eligendi eos error explicabo hic magnam maiores, nihil numquam
              optio perspiciatis praesentium provident quasi qui quo quod saepe soluta tenetur
              voluptatem! Est, et magni maiores molestiae quos tempore totam veritatis? At excepturi
              fugiat illum suscipit.
            </Typography>
          </DialogBody>
        </div>
      </div>
    </Dialog>
  )
}

export { PostDialog }
