import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui'
import Image from 'next/image'

type ImageCarouselProps = {
  images: string[]
  onClick?: (open: boolean) => void
}

export function ImageCarousel({ images, onClick }: ImageCarouselProps) {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div
              className={'flex aspect-square items-center justify-center'}
              onClick={() => onClick?.(true)}
            >
              <Image
                alt={`img ${index}`}
                className={'w-full h-full object-cover'}
                height={500}
                src={image}
                width={500}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  )
}

ImageCarousel.displayName = 'ImageCarousel'
