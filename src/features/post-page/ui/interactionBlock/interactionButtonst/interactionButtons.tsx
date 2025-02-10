import Bookmark from '@/assets/icons/components/filled-outlined-pairs/Bookmark'
import Heart from '@/assets/icons/components/filled-outlined-pairs/Heart'
import HeartOutline from '@/assets/icons/components/filled-outlined-pairs/HeartOutline'
import PaperPlaneOutline from '@/assets/icons/components/outlined/PaperPlaneOutline'
import { IconButton } from '@/shared/ui'
type InteractionButtonsProps = {
  isLiked: boolean
}
const InteractionButtons = (props: InteractionButtonsProps) => {
  //add logic
  // add buttons image variants
  const { isLiked } = props

  return (
    <div className={'flex justify-between'}>
      <div className={'flex gap-6'}>
        <IconButton onClick={() => alert('Like post')} size={'medium'}>
          {isLiked ? <Heart color={'red'} /> : <HeartOutline />}
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
