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
        <IconButton onClick={() => alert('Like post')} size={'medium'}>
          <Heart color={'red'} />
        </IconButton>
        <IconButton onClick={() => alert('Share post')} size={'medium'}>
          <PaperPlaneOutline />
        </IconButton>
      </div>
      <div>
        <IconButton onClick={() => alert('Add to bookmarks')} size={'medium'}>
          <Bookmark />
        </IconButton>
      </div>
    </div>
  )
}

export { InteractionButtons }
