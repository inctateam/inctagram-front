import imageDefault from '@/assets/icons/png/image-defolt.png'
import { ImageCarousel } from '@/shared/ui'
import { cn } from '@/shared/utils'
import Image from 'next/image'

type Props = {
  className?: string
  itemImages: string[]
  onClick?: () => void
  selectedIndexCallBack?: (index: number) => void
  size?: 'big' | 'small'
}

export const ImageContent = ({
  className,
  itemImages,
  onClick,
  selectedIndexCallBack,
  size = 'big',
}: Props) => {
  if (itemImages.length === 0) {
    return (
      <Image
        alt={'Post image'}
        className={cn(`h-full w-full object-cover`, className)}
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
        className={cn(`h-full w-full object-cover`, className)}
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
        className={className}
        images={itemImages}
        onClick={onClick}
        selectedIndexCallBack={selectedIndexCallBack} // Передаем функцию обновления selectedIndex
        size={size}
      />
    )
  }
}
