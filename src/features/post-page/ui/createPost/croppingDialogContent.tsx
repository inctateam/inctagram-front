import { Image } from '@/features/post-page/types'
import { CreatePostHeader } from '@/features/post-page/ui/createPost/createPostHeader'
import { createPostSliceSelectors } from '@/features/post-page/ui/createPost/createPostSlice'
import { useAppSelector } from '@/services'
import { DialogBody } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'

type CroppingDialogContentProps = {
  handleBack: () => void
  handleNext: () => void
}

export const CroppingDialogContent = ({ handleBack, handleNext }: CroppingDialogContentProps) => {
  const imagesState = useAppSelector(createPostSliceSelectors.selectImages)

  return (
    <div className={'w-[492px] h-[564px] flex flex-col'}>
      <CreatePostHeader handleBack={handleBack} handleNext={handleNext} title={'Cropping'} />
      <DialogBody className={'flex h-full'}>
        <ImageContent itemImages={imagesState}></ImageContent>
      </DialogBody>
    </div>
  )
}
