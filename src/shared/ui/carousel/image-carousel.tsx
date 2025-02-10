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
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className={'flex aspect-square items-center justify-center'}>
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
