import { Image } from '@/features/post-page/types'
import { CreatePostHeader } from '@/features/post-page/ui/createPost/createPostHeader'
import { DialogBody } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'

type CroppingDialogContentProps = {
  handleBack: () => void
  handleNext: () => void
  images: Image[]
}

export const CroppingDialogContent = ({
  handleBack,
  handleNext,
  images,
}: CroppingDialogContentProps) => {
  return (
    <div className={'w-[492px] h-[564px] flex flex-col'}>
      <CreatePostHeader handleBack={handleBack} handleNext={handleNext} title={'Cropping'} />
      <DialogBody className={'flex h-full'}>
        <ImageContent itemImages={images.map(image => image.url)}></ImageContent>
      </DialogBody>
    </div>
  )
}
