import { useState } from 'react'

import { CreatePostStages } from '@/features/post-page/ui/createPost/createPostDialog'
import { CreatePostHeader } from '@/features/post-page/ui/createPost/createPostHeader'
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from '@/features/post-page/ui/createPost/createPostSlice'
import { FILTERS } from '@/features/post-page/ui/createPost/filters'
import { getFilteredImage } from '@/features/post-page/ui/createPost/getFilteredImage'
import { useAppDispatch, useAppSelector } from '@/services'
import { DialogBody, Typography } from '@/shared/ui'
import { ImageContent } from '@/shared/ui/image-content'
import Image from 'next/image'

type FilteringDialogContentProps = {
  setStage: (stage: CreatePostStages) => void
}

export const FilteringDialogContent = ({ setStage }: FilteringDialogContentProps) => {
  const dispatch = useAppDispatch()
  const images = useAppSelector(createPostSliceSelectors.selectImages)

  const [currentImage, setCurrentImage] = useState<number>(0)

  const setFilterHandler = async (filter: string) => {
    const link = await getFilteredImage(images[currentImage], filter)

    dispatch(createPostSliceActions.setImage({ image: link, index: currentImage }))
  }

  return (
    <div className={'w-[972px] h-[564px] flex flex-col'}>
      <CreatePostHeader
        handleBack={() => setStage(CreatePostStages.Cropping)}
        handleNext={() => setStage(CreatePostStages.Publish)}
        title={'Filtering'}
      />
      <DialogBody className={'flex flex-grow'}>
        <div className={'w-1/2 h-full flex'}>
          <ImageContent itemImages={images} selectedIndexCallBack={setCurrentImage}></ImageContent>
        </div>
        <div className={'w-1/2 h-full flex flex-wrap gap-6 justify-center py-6'}>
          {FILTERS.map((filter, index) => (
            <div className={'group flex flex-col gap-1 items-center justify-center'} key={index}>
              <Image
                alt={'123'}
                className={'object-cover block aspect-square rounded-sm'}
                height={108}
                onClick={() => setFilterHandler(filter.value)}
                src={images[currentImage]}
                style={{ filter: filter.value }}
                width={108}
              />
              <Typography className={'group-hover:text-accent-100'}>{filter.name}</Typography>
            </div>
          ))}
        </div>
      </DialogBody>
    </div>
  )
}
