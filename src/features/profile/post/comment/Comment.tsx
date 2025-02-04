import HeartOutline from '@/assets/icons/components/filled-outlined-pairs/HeartOutline'
import { Avatar, Typography } from '@/shared/ui'

const Comment = () => {
  return (
    <div className={'flex'}>
      <div className={'flex justify-center items-start'}>
        <Avatar
          alt={'User Avatar'}
          onClick={() => alert('redirect to user profile')}
          size={9}
          src={'https://i.pinimg.com/736x/98/2e/eb/982eeb2e215e5721e026c763215bd641.jpg'}
        />
      </div>
      <div className={'flex flex-col w-[385px] ml-3 mr-6'}>
        <Typography as={'p'} className={'text-balance'} variant={'regular14'}>
          <Typography as={'span'} className={'gap-1'} variant={'h3'}>
            URLProfile
          </Typography>{' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur atque autem commodi
          cumque earum eligendi eos error explicabo hic magnam maiores, nihil numquam optio
          perspiciatis praesentium provident quasi qui quo quod saepe soluta tenetur voluptatem!
          Est, et magni maiores molestiae quos tempore totam veritatis? At excepturi fugiat illum
          suscipit.
        </Typography>
        <div className={'flex gap-3'}>
          <Typography as={'p'} className={'text-light-900'} variant={'small'}>
            2 ours ago
          </Typography>
          <Typography as={'p'} className={'text-light-900'} variant={'semiSmall'}>
            Answer
          </Typography>
        </div>
      </div>
      <div>
        <HeartOutline />
      </div>
    </div>
  )
}

export { Comment }
