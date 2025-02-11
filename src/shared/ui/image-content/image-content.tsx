import imageDefault from '@/assets/icons/png/image-defolt.png'
import { PublicPostsImages } from '@/features/home-page/types'
import { ImageCarousel } from '@/shared/ui'
import Image from 'next/image'

type Props = {
  itemImages: PublicPostsImages[]
  onClick?: () => void
}

export const ImageContent = ({ itemImages, onClick }: Props) => {
  if (itemImages.length === 0) {
    // Если нет картинок, показываем дефолтную картинку
    return <Image alt={'Post image'} onClick={onClick} src={imageDefault} />
  } else if (itemImages.length === 1) {
    // Если одна картинка, показываем её
    return (
      <Image
        alt={'Post image'}
        className={'h-full w-full'}
        height={400}
        onClick={onClick}
        src={itemImages[0].url}
        width={400}
      />
    )
  } else {
    // Если больше одной картинки, показываем ImageCarousel
    return <ImageCarousel images={itemImages.map(image => image.url)} onClick={onClick} />
  }
}
