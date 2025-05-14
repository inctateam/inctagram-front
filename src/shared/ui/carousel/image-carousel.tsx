import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui'
import { cn } from '@/shared/utils'
import Image from 'next/image'

type ImageCarouselProps = {
  className?: string
  images: string[]
  onClick?: () => void
  selectedIndexCallBack?: (index: number) => void
  size?: 'big' | 'small'
}

export function ImageCarousel({
  className,
  images,
  onClick,
  selectedIndexCallBack,
  size = 'big',
}: ImageCarouselProps) {
  return (
    <Carousel opts={{ loop: true }} selectedIndexCallBack={selectedIndexCallBack}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              alt={`img ${index}`}
              className={cn(`w-full min-h-32 h-full object-cover`, className)}
              height={400}
              onClick={onClick}
              priority
              src={image}
              width={400}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {size === 'big' && <CarouselPrevious />}
      {size === 'big' && <CarouselNext />}
      <CarouselDots />
    </Carousel>
  )
}

ImageCarousel.displayName = 'ImageCarousel'
