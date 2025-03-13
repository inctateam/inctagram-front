import imageDefault from '@/assets/icons/png/image-defolt.png'
import { ImageCarousel } from '@/shared/ui'
import Image from 'next/image'

type Props = {
  itemImages: string[]
  onClick?: () => void
  selectedIndexCallBack?: (index: number) => void
}

export const ImageContent = ({ itemImages, onClick, selectedIndexCallBack }: Props) => {
  if (itemImages.length === 0) {
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
    // Показываем одно изображение, если 1 картинка
    return (
      <Image
        alt={'Post image'}
        className={'h-full w-full object-cover'}
        height={400}
        onClick={onClick}
        priority
        src={itemImages[0] ?? imageDefault} // Показываем выбранное изображение
        width={400}
      />
    )
  } else {
    // Показываем карусель
    return (
      <ImageCarousel
        images={itemImages}
        onClick={onClick}
        selectedIndexCallBack={selectedIndexCallBack} // Передаем функцию обновления selectedIndex
      />
    )
  }
}
