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
    return (
      <Image
        alt={'Post image'}
        className={'h-full w-full object-cover'}
        onClick={onClick}
        priority
        src={imageDefault}
      />
    )
  } else if (itemImages.length === 1) {
    // Если одна картинка, показываем её
    return (
      <Image
        alt={'Post image'}
        className={'h-full w-full object-cover'}
        height={400}
        onClick={onClick}
        priority
        src={itemImages[0].url}
        width={400}
      />
    )
  } else {
    // Если больше одной картинки, показываем ImageCarousel
    return <ImageCarousel images={itemImages.map(image => image.url)} onClick={onClick} />
  }
}
