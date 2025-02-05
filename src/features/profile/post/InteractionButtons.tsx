import Bookmark from '@/assets/icons/components/filled-outlined-pairs/Bookmark'
import Heart from '@/assets/icons/components/filled-outlined-pairs/Heart'
import PaperPlaneOutline from '@/assets/icons/components/outlined/PaperPlaneOutline'
import { IconButton } from '@/shared/ui'

const InteractionButtons = () => {
  //add logic
  // add buttons image variants
  return (
    <div className={'flex justify-between'}>
      <div className={'flex gap-6'}>
        <IconButton size={'medium'}>
          <Heart color={'red'} />
        </IconButton>
        <IconButton size={'medium'}>
          <PaperPlaneOutline />
        </IconButton>
      </div>
      <div>
        <IconButton size={'medium'}>
          <Bookmark />
        </IconButton>
      </div>
    </div>
  )
}

export { InteractionButtons }
